/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component } from '@angular/core';
import {
  AlertController,
  NavController
} from 'ionic-angular';

// Services

// Pages
import { BasePage } from '../base-page';
import { FindDriverPage } from '../find-driver/find-driver';
import { APP_TITLE } from "../../providers/config";

// Provider
import { ToasterProvider } from "../../providers/toaster";

@Component({
  templateUrl: 'payment.html'
})
export class PaymentPage extends BasePage {

  title: string;
  pickupOptionValue: string = 'NOW';
  paymentOption: number = 1;
  driver_note: string = '';
  promo_code: string = '';

  constructor(
    private nav: NavController,
    protected alertCtrl: AlertController,
    public toaster: ToasterProvider
  ) {
    super(alertCtrl);
    this.title = APP_TITLE;
  }
  public pickupOption(type: number) {
    if (type === 2) {
      this.pickupOptionValue = 'LATER';
      this.presentToast(`You have choosed PICK-UP ${this.pickupOptionValue}`);
    }
    this.presentToast(`You have choosed PICK-UP ${this.pickupOptionValue}`);
  }

  presentToast(msg: string) {

  }

  // Radio alert
  public radioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Payment Option');
    alert.addInput({ type: 'radio', label: 'COD', value: '1', checked: true });
    alert.addInput({ type: 'radio', label: 'CREDIT CARD', value: '2' });
    alert.addInput({ type: 'radio', label: 'PAYPAL', value: '3' });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: (data) => {
        this.paymentOption = data;
        alert.dismiss();
        return false;
      }
    });

    alert.present();
  }

  public book() {
    let bookingObject = {
      pickupOption: this.pickupOptionValue,
      paymentOption: this.paymentOption,
      driver_note: this.driver_note,
      promo_code: this.promo_code
    };
    console.log(bookingObject);
    this.nav.push(FindDriverPage, bookingObject);
  }

}
