import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Page1} from "./page1";

import { MomentModule } from 'angular2-moment';

import { FCM } from "@ionic-native/fcm";

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Device } from '@ionic-native/device';



@NgModule({
  declarations: [
    Page1
  ],
  imports: [
    IonicPageModule.forChild(Page1),
    MomentModule   
    
  ],
  providers: [
    FCM,
    InAppBrowser,
    Device
  ]
})
export class Module {}
