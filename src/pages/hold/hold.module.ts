import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HoldPage} from "./hold";

//import { MomentModule } from 'angular2-moment';

import { Device } from '@ionic-native/device';



@NgModule({
  declarations: [
    HoldPage
  ],
  imports: [
    IonicPageModule.forChild(HoldPage),
    //MomentModule
  ],
  providers: [
    Device
  ]
})
export class HoldPageModule {}
