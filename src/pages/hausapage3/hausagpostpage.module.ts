import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaGPostPage } from "../hausapage3/hausagpostpage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { InAppBrowser } from '@ionic-native/in-app-browser';



@NgModule({
    declarations: [
        HausaGPostPage
    ],
    imports: [
        IonicPageModule.forChild(HausaGPostPage),
        MomentModule,
        IonicImageViewerModule
    ],
    providers: [
        InAppBrowser
    ]
})
export class HausaGPostPageModule { }
