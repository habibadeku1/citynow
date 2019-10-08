
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from "./login";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

//import { Network } from '@ionic-native/network';

import { LoginLogoutService } from '../../services/loginlogout'; 




@NgModule({
    declarations: [
        LoginPage 
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
        MomentModule
    ],
    providers: [
    //    Network,
        LoginLogoutService
    ]
})
export class LoginPageModule { }
