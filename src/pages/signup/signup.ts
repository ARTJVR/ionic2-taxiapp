/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */
// Core module
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

// Page
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

// Classess
import { Country } from '../../providers/classes/country.classes';

// Provider
import { UsernameValidator } from '../../providers/validators';
import { AuthProvider } from '../../providers/auth';
import { UsersStorage } from '../../providers/fbStorage/users';
// Config
import { PASSWORD_LENGTH } from "../../providers/config";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {

  title: string;
  sampleForm: FormGroup;
  termsAgree: boolean;
  countries: Country[];
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public _user: UsersStorage
  ) { }

  ionViewWillLoad() {
    this.countries = [new Country('UY', 'Uruguay', '+598'), new Country('US', 'United States', '+1')];
    this.termsAgree = true;
    this.title = 'Signup';

    this.sampleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country: new FormControl(this.countries[0], Validators.required),
      gender: new FormControl('male', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(PASSWORD_LENGTH),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.required),
      agree: new FormControl(false, Validators.required)
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
    'name': [],
    'email': [],
    'password': [],
    'confirmPassword': []
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'email': {
      'required': 'Email is required',
      'pattern': 'Enter a valid email.'
    },
    'password': {
      'required': 'Password is required',
      'minlength': `Password must be at least ${PASSWORD_LENGTH} characters long.`,
      'pattern': 'Your password must contain at least one uppercase, one lowercase, and one number.'
    },
    'confirmPassword': {
      'required': 'Confirm password is required',
      'minlength': 'Confirm password must be at least 5 characters long.',
      'pattern': 'Your password must contain at least one uppercase, one lowercase, and one number.',
      'validateEqual': 'Password mismatch'
    }
  };

  onSubmit(values) {
    if (values.agree) {
      this.termsAgree = true;
      this.signupUser(values);
      this.navCtrl.push(HomePage);
    } else {
      this.termsAgree = false;
    }
  }


  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(values: any) { //this.signupForm.value.email, this.signupForm.value.password
    this.authData.signupUser(values.email, values.password)
      .then(() => {
        this._user.addToList(values)
          .then((res) => {
            console.log("user data stored in db", res);
          })
          .catch((err) => {
            console.log("something went wrong", err);
          });

        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        this.loading.dismiss().then(() => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
  }
  goForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
