/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

// Pages
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

// Provider
import { AuthProvider } from '../../providers/auth';

// Config
import { PASSWORD_LENGTH } from "../../providers/config";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  title: string;
  sampleForm: FormGroup;
  image: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public auth: AuthProvider,
    protected alertCtrl: AlertController,
  ) {  }

  ionViewWillLoad() {
    this.title = 'Login';
    this.image = 'assets/img/taxi.png';
    
    this.sampleForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(PASSWORD_LENGTH),
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
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
    'email': [],
    'password': []
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Enter a valid email.'
    },
    'password': {
      'required': 'Password is required',
      'minlength': `Password must be at least ${PASSWORD_LENGTH} characters long.`,
      'pattern': 'Your password must contain at least one uppercase, one lowercase, and one number.'
    }
  };

  onSubmit(values) {
    this.auth.loginUser(values.email, values.password)
      .then((res) => {
        console.log("login success response", res);
          this.navCtrl.push(HomePage);
      })
      .catch((err) => {
        console.log("login error response", err);
        const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: err.message,
            enableBackdropDismiss: false,
            buttons: [{
              text: 'OK',
              handler: () => {
                console.log("Alert button clicked");
              }
            }],
          });
          alert.present();
      });
  }
  onGoSignup() {
    this.navCtrl.push(SignupPage);
  }
  onForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
