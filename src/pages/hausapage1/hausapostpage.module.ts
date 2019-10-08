import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaPostPage } from "../hausapage1/hausapostpage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { InAppBrowser } from '@ionic-native/in-app-browser';




@NgModule({
    declarations: [
        HausaPostPage
    ],
    imports: [
        IonicPageModule.forChild(HausaPostPage),
        MomentModule,
        IonicImageViewerModule
    ],
    providers: [
        InAppBrowser
    ]
})
export class HausaPostPageModule { }
