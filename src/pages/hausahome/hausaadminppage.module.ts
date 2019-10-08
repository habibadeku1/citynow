import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaAdminPostPage } from "../hausahome/hausaadminppage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { PictureService } from '../../services/picture'; 



@NgModule({
    declarations: [
        HausaAdminPostPage
    ],
    imports: [
        IonicPageModule.forChild(HausaAdminPostPage),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class HausaAdminPostPageModule { }
