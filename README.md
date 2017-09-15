# AngularFormsBasics

##ngModel
You need to define FormsModule in your imports in order to use ngModel.

app.module.ts
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [AppModule],
    imports: [ BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}

The square brackets tell angular to evaluate the class property on right hand side of the asignment rather than take it as a string. 

[ngModel] = "classProperty"

Two-way binding is achieved by adding parenthesis around the expression, like so, ([ngModel]). Everytime the ngModel or the value of the input changes, it sends out an event to update the class property.  

##Check ngModel Validation
You can check the validity of an input by getting a reference to the ngModel.

You can inspect the control's state by exporting ngModel to a local template variable. 

<input type="text" 
[(ngModel)]= "username" 
#usernameRef="ngModel"
required
minlength="3">

States:
usernameRef.valid is true if input is valid and false is not valid.

dirty

touched

usernameRef.errors gives the name of error or null if there aren't any errors.

<div *ngIf="usernameRef.errors?.minlength">The minimum characters is 
{{usernameRef.errors.minlength.requiredLength}}.
You have typed
{{usernameRef.errors.minlength.actualLength}}.
</div>

The usernameRef.errors will be null if there are no errors. By putting the ? it won't evaluate the rest and so won't try and get the property of errors it is null. 

Custom validators


## Create and Submit Forms

Inputs are almost always wrapped in a form because you're gonna want to submit it and handle the data somehow. 

In a <form> ngModel needs a name attribute. The names of the different form elements helps structure the overall value of the form. 

<form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
    <input
        name="username">
    <input type="password" ngModel name="password">
    <button type="submit">Submit</button>
</form>
{{formRef.value | json }} // {"username: "John"}

formRef.value is an object that is represention fo the forms and all of its inputs.

The form has its overall validity:
{{formRef.valid}} // true or false

export class AppComponent {
    username = "John";
    onSubmit(formValue) {
        //
    }
}

In a form the form elements need to have:
* name
* ngModel
* type