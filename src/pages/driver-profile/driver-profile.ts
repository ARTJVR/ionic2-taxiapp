import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// Provider
import { CallProvider } from "../../providers/call";
// Config
import { DRIVER_PAGE_TITLE } from "../../providers/config";

@IonicPage()
@Component({
  selector: 'page-driver-profile',
  templateUrl: 'driver-profile.html',
})
export class DriverProfilePage {
  image: string;
  title: string = DRIVER_PAGE_TITLE;
  constructor(private _call: CallProvider) { }

  ionViewDidLoad() {
    this.image = 'assets/img/taxi.png';
    console.log('ionViewDidLoad DriverProfile');
  }

  callDriver() {
    this._call.me();
  }
}
