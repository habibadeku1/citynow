import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { ProfileViewPage } from "../profile/pview";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { PictureService } from '../../services/picture';



@NgModule({
    declarations: [
        ProfileViewPage
    ],
    imports: [
        IonicPageModule.forChild(ProfileViewPage),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class ProfileViewPageModule { }
