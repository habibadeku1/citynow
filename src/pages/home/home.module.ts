
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import {SharedModule} from "../../app/shared.module";

import { SuperTabsModule } from '../../ionic2-super-tabs/src';

//import { Network } from '@ionic-native/network';



@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SuperTabsModule//.forRoot(), 
]
})
export class HomePageModule {}