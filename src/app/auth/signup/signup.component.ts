import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';

function mustMatch(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { mustMatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')] }),
      confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')] }),
    }, { validators: [mustMatch] }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl<boolean>(false),
      new FormControl<boolean>(false),
      new FormControl<boolean>(false)
    ]),
    agree: new FormControl<boolean>(false, [Validators.requiredTrue])

  })


  onSubmit() {
    if (this.form.invalid) {
      console.log('Invalid form')
      return;
    }
    console.log(this.form.value)

  }

  onReset() {
    this.form.reset();
  }
}
