import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaAdminApprovePostPage } from "../hausahome/hausaadminapprove";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';


@NgModule({
    declarations: [
        HausaAdminApprovePostPage
    ],
    imports: [
        IonicPageModule.forChild(HausaAdminApprovePostPage),
        MomentModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class HausaAdminApprovePostPageModule { }
