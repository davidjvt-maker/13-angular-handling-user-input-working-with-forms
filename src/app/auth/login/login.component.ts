import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    }),
  })

  get emailInvalid() {
    return this.form.controls.email.invalid && this.form.controls.email.touched;
  }

  get passwordInvalid() {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      this.form.patchValue({ email: JSON.parse(savedForm).email });
    }
    const suscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify(value.email))
      }
    })
    this.destroyRef.onDestroy(() => suscription.unsubscribe());


  }

  onSubmit() {
    console.log('FORM SUBMITTED')
    console.log(this.form.value.email)
    console.log(this.form.value.password)
  }
}