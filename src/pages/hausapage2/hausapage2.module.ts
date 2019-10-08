import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HausaPage2} from "./hausapage2";

import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    HausaPage2
  ],
  imports: [
    IonicPageModule.forChild(HausaPage2),
    MomentModule
  ]
})
export class Module {}
