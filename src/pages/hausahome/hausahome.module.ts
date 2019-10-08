
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HausaHomePage } from "./hausahome";
import {SharedModule} from "../../app/shared.module";

import { SuperTabsModule } from '../../ionic2-super-tabs/src';
//import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    HausaHomePage
  ],
  imports: [
    IonicPageModule.forChild(HausaHomePage),
    SuperTabsModule//.forRoot(), 
    
  ]
})
export class HausaHomePageModule {}