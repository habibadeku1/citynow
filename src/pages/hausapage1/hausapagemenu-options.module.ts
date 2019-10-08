import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaPageMenuOptionsComponent } from "../hausapage1/hausapagemenu-options";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout'; 



@NgModule({
    declarations: [
        HausaPageMenuOptionsComponent
    ],
    imports: [
        IonicPageModule.forChild(HausaPageMenuOptionsComponent),
        MomentModule
    ],
    providers: [
        LoginLogoutService
    ]
})
export class HausaPageMenuOptionsComponentModule { }
