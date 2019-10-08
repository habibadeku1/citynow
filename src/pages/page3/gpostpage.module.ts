import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { GPostPage } from "../page3/gpostpage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PictureService } from '../../services/picture'; 
import { InAppBrowser } from "@ionic-native/in-app-browser";




@NgModule({
    declarations: [
        GPostPage
    ],
    imports: [
        IonicPageModule.forChild(GPostPage),
        MomentModule,
        IonicImageViewerModule
    ],
    providers: [
        PictureService,
        InAppBrowser
    ]
})
export class GPostPageModule { }
