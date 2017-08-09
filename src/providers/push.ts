import { Injectable } from '@angular/core';
import { AlertController, Platform } from "ionic-angular";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { PUSH_SENDER_ID } from "./config"

@Injectable()
export class PushProvider {

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public push: Push
  ) {
    console.log('Hello Push Provider');
  }

  init() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: PUSH_SENDER_ID
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

}
