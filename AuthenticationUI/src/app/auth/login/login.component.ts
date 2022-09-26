import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  loading = false;

  constructor(
    public fireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onLogin(form: any): void {
    this.errorMessage = null;
    this.loading = true;

    this.fireAuth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(
        () => {
          this.router.navigate(['home']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      )
      .finally(() => (this.loading = false));
  }

  onLoginWithGoogle(): void {
    this.fireAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['home']));
  }

  onRegisterNewUser() {
    this.router.navigate(['register']);
  }
}
