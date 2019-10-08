import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaPageMenuOptionsComponent3 } from "../hausapage3/hausapage3menu-options";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout'; 



@NgModule({
    declarations: [
        HausaPageMenuOptionsComponent3
    ],
    imports: [
        IonicPageModule.forChild(HausaPageMenuOptionsComponent3),
        MomentModule
    ],
    providers: [
        LoginLogoutService
    ]
})
export class HausaPageMenuOptionsComponent3Module { }
