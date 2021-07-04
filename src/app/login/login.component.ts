import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasFailedLogin = false;
  errorMessage = '';
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    } else {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((_user) => {
        this.router.navigateByUrl('/list');
      }, (_error) => {
        this.openAlert('Wrong email or password. Please try again.');
      })
      .catch((_error) => {
        this.openAlert('Error connecting to server. Please try again.');
      })
    }
  }

  openAlert(message: string){
    this.hasFailedLogin = true;
    this.errorMessage = message;
  }

  closeAlert(){
    this.hasFailedLogin = false;
    this.loginForm.reset();
  }

}

