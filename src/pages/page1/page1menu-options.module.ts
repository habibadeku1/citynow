import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { PageMenuOptionsComponent } from "../page1/page1menu-options";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { LoginLogoutService } from '../../services/loginlogout';



@NgModule({
    declarations: [
        PageMenuOptionsComponent
    ],
    imports: [
        IonicPageModule.forChild(PageMenuOptionsComponent),
        MomentModule
    ],
    providers: [
        LoginLogoutService
    ]
})
export class PageMenuOptionsComponentModule { }
