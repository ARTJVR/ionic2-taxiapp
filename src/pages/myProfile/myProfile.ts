/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {
  NavController,
  NavParams,
  AlertController,
  PopoverController
} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

// Page
import { HomePage } from '../home/home';
import { Country } from '../../providers/classes/country.classes';
import { CameraPopoverPage } from '../myProfile/cameraPopover';

// Provider
import { AuthProvider } from '../../providers/auth';
import { UsersStorage } from '../../providers/fbStorage/users';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html'
})

export class MyProfilePage {

  private title: string;
  private sampleForm: FormGroup;
  private countries: Country[];
  private name: string;
  private email: string;
  private password: string;
  private gender: string;
  private _country: any;
  private userKey: string;
  image: string;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public _user: UsersStorage,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) { }

  ionViewWillLoad() {
    this.countries = [new Country('UY', 'Uruguay', '+598'), new Country('US', 'United States', '+1')];
    this.image = 'assets/img/taxi.png';
    this.sampleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country: new FormControl('', Validators.required),
      gender: new FormControl('male', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

    this.sampleForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));

    this.email = this.navParams.get('email');
    this.title = this.name = this.navParams.get('name');
    this.password = this.navParams.get('password');
    this.gender = this.navParams.get('gender');
    this._country = this.countries.filter(c => c.iso === this.navParams.get('country').iso)[0];
    this.userKey = this._user.getUserKey();
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
    'password': []
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
      'minlength': 'Password must be at least 6 characters long.',
      'pattern': 'Your password must contain at least one uppercase, one lowercase, and one number.'
    }
  };

  onSubmit(values) {
    this.updateUser(values);
    this.navCtrl.push(HomePage);
  }
  
  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  updateUser(values: any) {
    values.agree = true;
    values.confirmPassword = values.password;
    this._user.updateItemInList(this.userKey, values);
  }

  openCameraPopover(myEvent) {
    this.popoverCtrl.create(CameraPopoverPage).present({
      ev: myEvent
    });;
  }
}

