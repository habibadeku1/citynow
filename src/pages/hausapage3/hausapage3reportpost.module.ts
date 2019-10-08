import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaReportPost3 } from "../hausapage3/hausapage3reportpost";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';


@NgModule({
    declarations: [
        HausaReportPost3
    ],
    imports: [
        IonicPageModule.forChild(HausaReportPost3),
        MomentModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class HausaReportPost3Module { }
