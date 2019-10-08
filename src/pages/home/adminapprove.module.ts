import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { AdminApprovePostPage } from "../home/adminapprove";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';


@NgModule({
    declarations: [
        AdminApprovePostPage
    ],
    imports: [
        IonicPageModule.forChild(AdminApprovePostPage),
        MomentModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class AdminApprovePostPageModule { }
