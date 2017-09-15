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

    <div *ngFor="let location of locations">
      <input 
        [id]="location"
        name="location"
        ngModel
        [value]="location" 
        type="radio"
        required>
      <label [attr.for]="location">{{location}}</label>
    </div>

    <select name="venue"
      [ngModel]="locations[0]">
      <option *ngFor="let location of locations"
        [value]="location">
        {{location}}
      </option>
    </select>
    
    <div>
      <button type="submit">Submit</button>
    </div>

    <div>{{formRef.value | json}}</div>
  </form>
  `,
  styles: [`
    .ng-invalid {
      border: 3px solid red;
    }

    .ng-invalid + label:after {
      content: '<--Pick one!!!';
    }
  `]
})
export class AppComponent {
  @ViewChild('formRef') form;

  username = "Ashnita";

  locations = ["Malta", "England", "Serbia", "Fiji"];

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
