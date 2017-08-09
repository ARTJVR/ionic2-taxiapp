import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map';
import { Vibration } from 'ionic-native';
import { MapService } from '../../providers/map/map.service';
import {
  LoadingController,
  AlertController,
  ModalController,
  NavController,
  Platform,
  PopoverController
} from 'ionic-angular';

// Pages
import { SearchPage } from '../../pages/search/search';
import { PaymentPage } from '../../pages/payment/payment';
import { PopoverPage } from '../../pages/home/popover';
import { ConfirmationPage } from '../../pages/confirmation/confirmation';
import { BasePage } from '../../pages/base-page';

// Provider
import { ToasterProvider } from "../../providers/toaster";
import { GeocoderService } from '../../providers/map/geocoder.service';

// Config
import { APP_TITLE,ConfigureGlobal } from "../../providers/config";

@Component({
  selector: 'set-route',
  template: `
    <it-map (onMapReady)="onMapReady();" (onMapIdle)="onMapIdle()" (onDragStart)="onDragStart()"></it-map>
    <div id="centerMarker" *ngIf="localized"></div>
    <div class="pickup-drop-holder">
        <ion-list>
            <ion-item (click)="openModal(1)">
                <ion-label color="primary" stacked>PICKUP</ion-label>
                <ion-label>{{pickup || 'Choose your pick-up'}}</ion-label>
            </ion-item>
            <ion-item (click)="openModal(2)">
                <ion-label color="primary" stacked>DROP-OFF</ion-label>
                <ion-label>{{dropoff || 'Choose your drop-off' }}</ion-label>
            </ion-item>
        </ion-list>
    </div>
  `,
  styles: [`
    .pickup-drop-holder {
        position: fixed;
        width: 95%;
        z-index: 10;
        top: 65px;
        left: 0;
        margin-left: 10px;
    }
    .pickup-drop-holder ion-label {
      padding: 5px !important;
    }
  `]
})
export class SetRouteComponent extends BasePage {

  localized: boolean = false;
  pickup: string = '';
  dropoff: string = '';
  chooseSameOption: boolean = false;

  constructor(
    private platform: Platform,
    private nav: NavController,
    private geocoderService: GeocoderService,
    private mapService: MapService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    protected alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public toaser: ToasterProvider,
    private configClass: ConfigureGlobal
  ) {
    super(alertCtrl);
    this.pickup = this.configClass.getPickup();
    this.dropoff = this.configClass.getDropoff();
    console.log('Hello SetRoute Component');
  }
  
  /***
   * This event is fired when map has fully loaded
   */
  onMapReady(): Promise<any> {
    // I must wait platform.ready() to use plugins ( in this case Geolocation plugin ).
    return this.platform.ready().then(() => {
      return this.locate().then(() => {
        const mapElement: Element = this.mapService.mapElement;
        if (mapElement) {
          mapElement.classList.add('show-map');
          this.mapService.resizeMap();
        }
      });
    });
  }

  /***
   * This event is fired when the map becomes idle after panning or zooming.
   */
  onMapIdle(): void {
    if (!this.localized) return;
    const position = this.mapService.mapCenter;
    this.geocoderService.addressForlatLng(position.lat(), position.lng())
      .subscribe((address: string) => {
        // const content = `<div padding><strong>${address}</strong></div>`;
        // this.mapService.createInfoWindow(content, position);
      }, (error) => {
        this.displayErrorAlert();
        console.error(error);
      });
  }

  /***
   * This event is fired when the user starts dragging the map.
   */
  onDragStart(): void {
    this.mapService.closeInfoWindow();
  }

  openModal(type: number): void {
    const searchModal = this.modalCtrl.create(SearchPage, {
      type: type
    });
    searchModal.onDidDismiss((data) => {
      if (data.type === 1) {
        this.pickup = (data.name === undefined) ? this.pickup : data.name;
        this.chooseSameOption = (this.dropoff !== '') ? (this.pickup === this.dropoff) ? false : true : true;
      } else {
        this.dropoff = (data.name === undefined) ? this.dropoff : data.name;
        this.chooseSameOption = (this.pickup !== '') ? (this.pickup === this.dropoff) ? false : true : true;
      }
      if (this.chooseSameOption === false) {
        this.presentToast('Please Don"t choose same option')
      }
      // Setting pickup and dropoff global value via config global method
      this.configClass.setPickup(this.pickup);
      this.configClass.setDropoff(this.dropoff);
    });

    searchModal.present();
  }

  /**
   * Get the current position
   */
  private locate(): Promise<any> {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    return this.mapService.setPosition().then(() => {
      this.localized = true;
      // Vibrate the device for a second
      Vibration.vibrate(1000);
    }).catch(error => {
      this.alertNoGps();
      console.warn(error);
    }).then(() => {
      // TODO why dismiss not working without setTimeout ?
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
  }

  private alertNoGps() {
    const alert = this.alertCtrl.create({
      title: 'Ionic Taxi',
      subTitle: 'Gps and network locations are unavailable. Click OK to retry',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          //setTimeout(() => this.locate(), 1500);
        }
      }],
    });
    alert.present();
  }

  
  presentToast(msg: string) {
    this.toaser.show(msg,'bottom');
  }

}
