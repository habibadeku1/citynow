import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { ProfileCViewPage } from "../profile/pcview";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { PictureService } from '../../services/picture';



@NgModule({
    declarations: [
        ProfileCViewPage
    ],
    imports: [
        IonicPageModule.forChild(ProfileCViewPage),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class ProfileCViewPageModule { }
