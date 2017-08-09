import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetRouteComponent } from './set-route';

@NgModule({
  declarations: [
    SetRouteComponent,
  ],
  imports: [
    IonicPageModule.forChild(SetRouteComponent),
  ],
  exports: [
    SetRouteComponent
  ]
})
export class SetRouteComponentModule {}
