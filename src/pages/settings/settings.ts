import { Component } from '@angular/core';
import { SETTING_PAGE_TITLE } from "../../providers/config";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  title:string = SETTING_PAGE_TITLE
  constructor() { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

}
