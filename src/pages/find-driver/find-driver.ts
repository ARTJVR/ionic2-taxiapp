import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Page
import {DriverProfilePage} from "../driver-profile/driver-profile"
// Provider
import { HIRE_BUTTON_TEXT, FIND_DRIVER_PAGE_TITLE } from "../../providers/config";

@IonicPage()
@Component({
  selector: 'page-find-driver',
  templateUrl: 'find-driver.html',
})
export class FindDriverPage {

  private drivers: any[];
  private image: string;
  private hireBtn: string = HIRE_BUTTON_TEXT;
  private title: string = FIND_DRIVER_PAGE_TITLE;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.drivers = [
      {name: 'Edward Thomas',status: 'Bidding...',hireme:true},
      {name: 'Denis Suaraz',status: 'Connecting...',hireme:false},
      {name: 'Karim Benzema',status: 'Bidding...',hireme:false},
      {name: 'Martin Montoya',status: 'Connecting...',hireme:false},
      {name: 'Karim Benzema',status: 'Bidding...',hireme:false},
      {name: 'Martin Montoya',status: 'Connecting...',hireme:false},
      {name: 'Karim Benzema',status: 'Bidding...',hireme:false},
      {name: 'Martin Montoya',status: 'Connecting...',hireme:false}
    ];
  }

  ionViewDidLoad() {
    this.image = 'assets/img/find-driver.png';
    console.log('ionViewDidLoad FindDriver');
  }

  driverProfile() {
    this.navCtrl.push(DriverProfilePage);
  }
}
