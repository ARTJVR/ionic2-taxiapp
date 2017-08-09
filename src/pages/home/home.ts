/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component } from '@angular/core';
import {
  AlertController,
  NavController,
  PopoverController,
  ToastController
} from 'ionic-angular';

// Pages
import { BasePage } from '../base-page';
import { SearchPage } from '../search/search';
import { PopoverPage } from '../home/popover';
import { PaymentPage } from '../payment/payment';
import { ConfirmationPage } from '../confirmation/confirmation';

// Provider
import { ToasterProvider } from "../../providers/toaster";

// Config
import { APP_TITLE, ConfigureGlobal } from "../../providers/config";

@Component({
  templateUrl: 'home.template.html'
})
export class HomePage extends BasePage {

  title: string;
  footerItem: string;
  rideOption: string = 'TAXI';
  chooseSameOption: boolean = false;

  constructor(
    private nav: NavController,
    protected alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    private configClass: ConfigureGlobal,
    private toaster: ToasterProvider
  ) {
    super(alertCtrl);
    this.title = APP_TITLE;
    this.footerItem = this.rideOption;
  }

  // goToConfirmation(): void {
  //   this.nav.push(ConfirmationPage);
  // }

  public goPayment() {
    let getPickupValue = this.configClass.getPickup(),
      getDropoffValue = this.configClass.getDropoff();

    if (getPickupValue !== '' && getDropoffValue !== '') {
      let routeInfObj = {
        pickup: getPickupValue,
        dropoff: getDropoffValue,
        rideOption : this.rideOption
      };
      console.log(routeInfObj);
      this.nav.push(PaymentPage,routeInfObj)
    }else{
      this.presentToast("Please choose pickup and dropof option");
    }
  }

  public presentPopover(myEvent) {
    this.popoverCtrl.create(PopoverPage).present({
      ev: myEvent
    });
  }

  presentToast(msg: string,position: string = 'bottom') {
    this.toaster.show(msg,position);
  }

  public selectedTAXI() {
    this.rideOption = 'TAXI';
    this.presentToast(`You selected ${this.rideOption}`,'top');
  }
  public selectedSUV() {
    this.rideOption = 'SUV';
    this.presentToast(`You selected ${this.rideOption}`,'top');
  }
  public selectedCAR() {
    this.rideOption = 'CAR';
    this.presentToast(`You selected ${this.rideOption}`,'top');
  }

}
