import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Page2} from "./page2";

import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    Page2
  ],
  imports: [
    IonicPageModule.forChild(Page2),
    MomentModule
  ]
})
export class Module {}
