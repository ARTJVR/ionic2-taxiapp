
import { Component } from '@angular/core';
import {
    ViewController,
    Platform
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

// Provider
import { CameraProvider } from "../../providers/camera";
import { ToasterProvider } from "../../providers/toaster";
// Config
import { CORDOVA_ENABLE } from "../../providers/config";

@Component({
    template: `
    <ion-list>
      <button ion-item (click)="uploadPhoto()">Upload Photo</button>
      <button ion-item (click)="selectFromDevice()">Select Photo on Device</button>
    </ion-list>`
})
export class CameraPopoverPage {
    userInfo: any;
    isUserLoggedIn: boolean;

    constructor(
        public viewCtrl: ViewController,
        public toaster: ToasterProvider,
        public platform: Platform,
        private _camera: CameraProvider
    ) { }

    close() {
        this.viewCtrl.dismiss();
    }

    uploadPhoto() {
        if (CORDOVA_ENABLE) {
            this._camera.takePicture();
        } else {
            this.presentToast("This native feature not available");
        }
    }

    selectFromDevice() {
        if (CORDOVA_ENABLE) {
            this._camera.selectPicture();
        } else {
            this.presentToast("This native feature not available");
        }
    }

    presentToast(msg: string) {
        this.toaster.show(msg, 'bottom')
    }
}