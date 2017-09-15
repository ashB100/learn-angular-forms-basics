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
    @ViewChild('formRef') form;

    username = "John";
    onSubmit(formValue) {
        //
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

In a form the form elements need to have:
* name
* ngModel


##Style validation

classes:
ng-untouched
ng-touched
ng-prestine
ng-dirty
ng-valid
ng-invalid

This allows us to style these input fields withh our own custom styles based on these classes.

styles: [`
    .ng-invalid {
        border: 3px solid red;
    }

    .ng-valid {
        border: 3px solid green;
    }
`]

While ng-prestine and ng-untouched are classes that you could create styles for they are also properties on the ngModel as well:

{{usernameRef.untouched}} // true means you've gone in the input field and lost focus
{{usernameRef.prestine}} // false means the original value has been changed, even if its been changed back to the same value.  

So the ngModel properties are:
* pristine
* dirty
* touched
* untouched

## RxJS streams with angular 2 forms

There are two streams avaialable:
* valueChanges
* statusChanges

lifecycle hook
ngAfterViewInit() {
    @ViewChild('formRef') form;  // 

}

## Radio buttons

<form>
    <div *ngFor="let location of locations">
        <input
            [id]="location"
            name="location"
            [value]="location"
            ngModel
            type="radio">
        <label [attr.for]="location">{{location}}</label>
    </div>
</form>

* We need to give an id to our input. The id is a property of input as well as an attribute. Since it is a property, we can put it in [] and assign the evaluated value of location. 
* In <label> for is not a propterty but an attribute so we put [attr.for]="location".
* The value of the radio button will be the location that got selected so we put value in [] assign the evaluated value of location.   

## Select dropdowns
<select name="location"
    [ngModel]="locations[0]">
    <option *ngFor="let location of locations"
    [value]="location">
    {{location}}
    </option>
</select>

Select dropdowns are built with select and option elements. ngModel keeps track of the value as it changes.
