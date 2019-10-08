import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from "../page1/postpage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PictureService } from '../../services/picture'; 

import { InAppBrowser } from "@ionic-native/in-app-browser";



@NgModule({
    declarations: [
        PostPage
    ],
    imports: [
        IonicPageModule.forChild(PostPage),
        MomentModule,
        IonicImageViewerModule
    ],
    providers: [
        PictureService,
        InAppBrowser
    ]
})
export class PostPageModule { }
