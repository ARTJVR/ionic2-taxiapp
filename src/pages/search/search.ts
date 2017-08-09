/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { MapService } from '../../providers/map/map.service';
import { BasePage } from '../base-page';

@Component({
  templateUrl: 'search.html'
})

export class SearchPage extends BasePage {

  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;

  private nearbyPlaces: Array<any> = [];
  private addressElement: HTMLInputElement = null;

  constructor(
    private mapService: MapService,
    private zone: NgZone,
    protected alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private params: NavParams
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.initAutocomplete();
    this.loadNearbyPlaces();
  }

  dismiss(selectedName: string,location?: google.maps.LatLng) {
    if (location) {
      this.mapService.mapCenter = location;
    }
    if (this.addressElement) {
      this.addressElement.value = '';
    }
    this.viewCtrl.dismiss({
      type: this.params.get('type'),
      name: selectedName
    });
  }

  /*
   * Place item has been selected
   */
  selectPlace(place: any) {
    this.dismiss(place.name,place.geometry.location);
  }

  private initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.mapService.createAutocomplete(this.addressElement)
      .subscribe((location) => {
        this.dismiss(location);
      }, (error) => {
        this.displayErrorAlert();
        console.error(error);
      });
  }

  private loadNearbyPlaces(): void {
    this.nearbyPlaces = [];
    this.mapService.loadNearbyPlaces().subscribe((_nearbyPlaces) => {
      this.zone.run(() => {
        this.nearbyPlaces.push.apply(this.nearbyPlaces, _nearbyPlaces);
      });
    }, (error) => {
      this.displayErrorAlert();
      console.error(error);
    });
  }
}
