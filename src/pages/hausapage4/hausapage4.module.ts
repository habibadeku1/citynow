import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HausaPage4} from "./hausapage4";

import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    HausaPage4
  ],
  imports: [
    IonicPageModule.forChild(HausaPage4),
    MomentModule
  ]
})
export class Module {}
