/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';

// Ionic native provider 
import { Push } from "@ionic-native/push";
import { Camera } from "@ionic-native/camera";
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

// Components
import { TaxiApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { RideListPage } from '../pages/ride-list/ride-list';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { PopoverPage } from '../pages/home/popover';
import { FindDriverPage } from '../pages/find-driver/find-driver';
import { SearchPage } from '../pages/search/search';
import { PaymentPage } from '../pages/payment/payment';
import { MyProfilePage } from '../pages/myProfile/myProfile';
import { CameraPopoverPage } from '../pages/myProfile/cameraPopover';
import { DriverProfilePage } from '../pages/driver-profile/driver-profile';
import { SettingsPage } from "../pages/settings/settings";

// Component
import { MapComponent } from '../components/map/map';
import { SetRouteComponent } from "../components/set-route/set-route";

// Services 
import { RideService } from '../providers/ride/ride.service';
import { GeocoderService } from '../providers/map/geocoder.service';
import { MapService } from '../providers/map/map.service';

// Provider
import { AuthProvider } from '../providers/auth';
import { UsersStorage } from '../providers/fbStorage/users';
import { CameraProvider } from '../providers/camera';
import { ConfigureGlobal } from "../providers/config";
import { ToasterProvider } from "../providers/toaster";
import { CallProvider } from "../providers/call";
import { ShareProvider } from "../providers/share";
import { PushProvider } from "../providers/push";

// Config 
import { FIREBASE_CONFIG_OBJ } from "../providers/config";

// Angular firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    TaxiApp,
    HomePage,
    SignupPage,
    LoginPage,
    ForgotPasswordPage,
    RideListPage,
    SearchPage,
    PaymentPage,
    PopoverPage,
    MyProfilePage,
    ConfirmationPage,
    FindDriverPage,
    DriverProfilePage,
    CameraPopoverPage,
    SetRouteComponent,
    MapComponent,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TaxiApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG_OBJ)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TaxiApp,
    HomePage,
    LoginPage,
    SignupPage,
    RideListPage,
    SearchPage,
    PaymentPage,
    PopoverPage,
    MyProfilePage,
    ForgotPasswordPage,
    ConfirmationPage,
    FindDriverPage,
    DriverProfilePage,
    CameraPopoverPage,
    SettingsPage
  ],
  providers: [
    Push,
    Camera,
    CallNumber,
    SocialSharing,
    RideService, 
    GeocoderService, 
    MapService, 
    AngularFireDatabase, 
    AuthProvider, 
    UsersStorage,
    CameraProvider,
    ConfigureGlobal,
    ToasterProvider,
    CallProvider,
    ShareProvider,
    PushProvider
  ]
})

//  This AppModule class bootstrap up by 
//  platformBrowserDynamic().bootstrapModule() 
//  method in main.ts file

export class AppModule { }
