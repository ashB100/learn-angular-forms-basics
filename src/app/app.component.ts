import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  template: `
  <form #formRef="ngForm" 
    (submit)="onSubmit(formRef.value)">

    <fieldset ngModelGroup="login">
      <input
      name="username" 
      type="text" 
      [(ngModel)]="username"
      #usernameRef="ngModel"
      required
      minlength="3">
      
      <div *ngIf="usernameRef.errors?.required">This field is required</div>
      <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} chars. You only typed {{usernameRef.errors?.minlength.actualLength}}.</div>
    
      <input type="password" ngModel name="password">
    </fieldset>

    <button type="submit">Submit</button>
  </form>
  `,
  styles: [`
    .ng-valid {
      border: 3px solid green;
    }

    .ng-invalid {
      border: 3px solid red;
    }
  `]
})
export class AppComponent {
  @ViewChild('formRef') form;

  username = "Ashnita";

  onSubmit(formValue) {
    console.log(formValue); // {login: {username: "", password: ""}}
  }

  ngAfterViewInit() {
    // Everytime the form changes its going 
    // to pass the value along
    /*this.form.valueChanges
      .subscribe(v => console.table(v)); */

    // Everytime the status of the fom changes
    /*this.form.statusChanges
      .subscribe(v => console.log(v)); */

    // We only want valid changes
    Observable.combineLatest(
      this.form.statusChanges,
      this.form.valueChanges,
      (status, value) => ({status, value})
    )
      .filter(({status}) => status === 'VALID')
      .subscribe(({value}) => console.table(value));
  }
}
