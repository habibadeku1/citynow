import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { ReportPost3 } from "../page3/page3reportpost";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';


@NgModule({
    declarations: [
        ReportPost3
    ],
    imports: [
        IonicPageModule.forChild(ReportPost3),
        MomentModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class ReportPost3Module { }
