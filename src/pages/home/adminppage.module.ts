import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { AdminPostPage } from "../home/adminppage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { PictureService } from '../../services/picture'; 



@NgModule({
    declarations: [
        AdminPostPage
    ],
    imports: [
        IonicPageModule.forChild(AdminPostPage),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class AdminPostPageModule { }
