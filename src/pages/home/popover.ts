// Core
import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

// Provider
import { AuthProvider } from '../../providers/auth';
import { ShareProvider } from "../../providers/share";
import { ToasterProvider } from "../../providers/toaster";
import { UsersStorage } from '../../providers/fbStorage/users';

// Pages
import { MyProfilePage } from '../myProfile/myProfile';
import { SettingsPage } from "../settings/settings";

// Config
import { CORDOVA_ENABLE } from "../../providers/config";

@Component({
    template: `
        <button ion-item class="popoverItem" (click)="myProfile()">My Profile</button>
        <button ion-item class="popoverItem" (click)="shareApp()">Share App</button>
        <button ion-item class="popoverItem" (click)="settings()">Settings</button>
        <button ion-item class="popoverItem" (click)="logout()">Logout</button>
    `,
    styles: [`
        .item-ios[detail-push] .item-inner, 
        button.item-ios:not([detail-none]) .item-inner, 
        a.item-ios:not([detail-none]) .item-inner { 
            background-image: none !important; 
        }
    `]
})
export class PopoverPage {
    userInfo: any;
    isUserLoggedIn: boolean;
    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public auth: AuthProvider,
        public _user: UsersStorage,
        public toaster: ToasterProvider,
        private share: ShareProvider
    ) {
        this._user.getValue(this.auth.getUserEmail());
        this.userInfo = this._user.getUserInfo();
        this.auth.isUserLoggedIn().subscribe(item => {
            this.isUserLoggedIn = item;
        });
    }

    logout() {
        this.auth.logoutUser()
            .then((res) => {
                this.close();
                console.log("user logout response", res);
            });
    }

    myProfile() {
        if (this.userInfo === undefined) {
            this.close();
            this.presentToast("Please try again");
        } else {
            this.navCtrl.push(MyProfilePage, this.userInfo)
        };
    }

    close() {
        this.viewCtrl.dismiss();
    }

    presentToast(msg: string, position: string = 'bottom') {
        this.toaster.show(msg, position);
    }

    shareApp() {
        if (CORDOVA_ENABLE) {
            this.share.share();
        } else {
            this.toaster.show("Cordova is not enabled");
        }
        this.close();
    }
    settings() {
        this.close();
        this.navCtrl.push(SettingsPage);
    }
}