/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// Provider
import { AuthProvider } from '../providers/auth';
import { PushProvider } from '../providers/push';
// Configuration
import { CORDOVA_ENABLE } from "../providers/config";

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
})
export class TaxiApp {

  rootPage: any;

  constructor(
    private platform: Platform,
    private auth: AuthProvider,
    private push: PushProvider
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // https://github.com/apache/cordova-plugin-inappbrowser
      // The cordova.InAppBrowser.open() function is defined to be a drop-in replacement for the window.open()
      // function. Existing window.open() calls can use the InAppBrowser window, by replacing window.open:
      if ((<any>window).cordova && (<any>window).cordova.InAppBrowser) {
        window.open = (<any>window).cordova.InAppBrowser.open;
      }

      // Page render according to authentication
      this.auth.isUserLoggedIn().subscribe(item => {
        if (item) {
          this.rootPage = HomePage
        } else {
          this.rootPage = LoginPage
        }
      });

      if (CORDOVA_ENABLE) {
        // Push notification fn call
        this.push.init();
      } else {
        console.log("Cordova is not enabled");
      }

    });
  }
}
