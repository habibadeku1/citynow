
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from "./signup";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout';
//import { Network } from '@ionic-native/network';



@NgModule({
    declarations: [
        SignupPage
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        MomentModule
    ],
    providers: [
        LoginLogoutService,
     //   Network
    ]
})
export class SignupPageModule { }
