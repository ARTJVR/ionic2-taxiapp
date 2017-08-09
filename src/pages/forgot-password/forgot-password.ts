/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

// Pages
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

// Provider
import { AuthProvider } from '../../providers/auth';


@Component({
  selector: 'page-login',
  templateUrl: 'forgot-password.html'
})

export class ForgotPasswordPage {

  title: string;
  image: string;
  sampleForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider
  ) { }

  ionViewWillLoad() {
    this.title = 'Forgot Password';
    this.image = 'assets/img/taxi.png';

    this.sampleForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });

    this.sampleForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.sampleForm) { return; }
    const form = this.sampleForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.sampleForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  formErrors = {
    'email': []
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Enter a valid email.'
    },
  };

  onSubmit(values) {
    this.auth.resetPassword(values.email)
      .then((res) => {
        // add toaster
        console.log("forgot password reset success response", res);
        this.navCtrl.pop();
      })
      .catch((err) => {
        // add toaster
        console.log("forgot password reset error response", err);
      });
  }
  onGoPrev() {
    this.navCtrl.pop();
  }
  goLogin() {
    this.navCtrl.push(LoginPage);
  }
  goSignup() {
    this.navCtrl.push(SignupPage);
  }
}
