import { Component } from '@angular/core';

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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = "Ashnita";

  onSubmit(formValue) {
    console.log(formValue); // {login: {username: "", password: ""}}
  }
}
