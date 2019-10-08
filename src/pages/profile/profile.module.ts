import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { PictureService } from '../../services/picture';



@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class ProfilePageModule { }
