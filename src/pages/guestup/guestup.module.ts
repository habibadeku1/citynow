
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { GuestupPage } from "../guestup/guestup";

import { MomentModule } from 'angular2-moment';
//import { Device } from '@ionic-native/device';
//import { Network } from '@ionic-native/network';



@NgModule({
    declarations: [
        GuestupPage
    ],
    imports: [
        IonicPageModule.forChild(GuestupPage),
        MomentModule
    ]
})
export class GuestupPageModule { }
