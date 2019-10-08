import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { PageMenuOptionsComponent3 } from "../page3/page3menu-options";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout';



@NgModule({
    declarations: [
        PageMenuOptionsComponent3
    ],
    imports: [
        IonicPageModule.forChild(PageMenuOptionsComponent3),
        MomentModule
    ],
    providers: [
        LoginLogoutService
    ]
})
export class PageMenuOptionsComponent3Module { }
