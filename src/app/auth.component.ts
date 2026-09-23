import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  template: `
    <div class="auth-page"><div class="auth-brand"><a routerLink="/" class="navbar-brand"><span class="brand-mark">b</span> bite<span class="brand-dot">.</span></a><p>Great food is one click away.</p></div><section class="auth-card"><div class="auth-intro"><p class="eyebrow">{{ isSignup ? 'WELCOME TO THE TABLE' : 'WELCOME BACK' }}</p><h1>{{ isSignup ? 'Create your account.' : 'Let’s get you fed.' }}</h1><p>{{ isSignup ? 'Save your favourites and track every delicious delivery.' : 'Sign in to pick up where you left off.' }}</p></div><form [formGroup]="form" (ngSubmit)="submit()" novalidate><div *ngIf="isSignup" class="form-field"><label for="name">Full name</label><input id="name" type="text" formControlName="name" placeholder="Alex Morgan"><small *ngIf="fieldInvalid('name')">Please enter your name.</small></div><div class="form-field"><label for="email">Email address</label><input id="email" type="email" formControlName="email" placeholder="you@example.com"><small *ngIf="fieldInvalid('email')">Enter a valid email address.</small></div><div class="form-field"><label for="password">Password</label><input id="password" type="password" formControlName="password" placeholder="At least 6 characters"><small *ngIf="fieldInvalid('password')">Password must be at least 6 characters.</small></div><div *ngIf="isSignup" class="form-check terms"><input class="form-check-input" type="checkbox" id="terms" formControlName="terms"><label class="form-check-label" for="terms">I agree to the bite terms and privacy policy.</label><small *ngIf="fieldInvalid('terms')">Please accept the terms to continue.</small></div><button class="btn btn-dark w-100 auth-submit" type="submit">{{ isSignup ? 'Create account' : 'Log in' }} <span>→</span></button><div class="divider-label"><span>or</span></div><button type="button" class="social-button">Continue with Google</button></form><p class="switch-auth">{{ isSignup ? 'Already have an account?' : 'New to bite?' }} <a [routerLink]="isSignup ? '/login' : '/signup'">{{ isSignup ? 'Log in' : 'Create an account' }}</a></p></section></div>
  `,
})
export class AuthComponent {
  isSignup = false;
  form!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly route: ActivatedRoute, private readonly router: Router) { this.isSignup = this.route.snapshot.data['mode'] === 'signup'; this.form = this.formBuilder.group({ name: [''], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]], terms: [false] }); if (this.isSignup) this.form.controls['name'].addValidators(Validators.required); }
  fieldInvalid(field: string) { const control = this.form.get(field); return !!control && control.invalid && (control.dirty || control.touched); }
  submit() { this.form.markAllAsTouched(); if (this.form.valid && (!this.isSignup || this.form.controls['terms'].value)) this.router.navigate(['/']); }
}
