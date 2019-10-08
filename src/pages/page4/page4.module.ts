import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Page4} from "./page4";

import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    Page4
  ],
  imports: [
    IonicPageModule.forChild(Page4),
    MomentModule
  ]
})
export class Module {}
