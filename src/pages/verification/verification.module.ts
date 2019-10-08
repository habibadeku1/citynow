
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { VerificationPage } from "./verification";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout';
//import { Network } from '@ionic-native/network';



@NgModule({
    declarations: [
        VerificationPage
    ],
    imports: [
        IonicPageModule.forChild(VerificationPage),
        MomentModule
    ],
    providers: [
     //   Network,
        LoginLogoutService
    ]
})
export class VerificationPageModule { }
