import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindDriverPage } from './find-driver';

@NgModule({
  declarations: [
    FindDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(FindDriverPage),
  ],
  exports: [
    FindDriverPage
  ]
})
export class FindDriverModule {}
