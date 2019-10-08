import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PictureService } from '../../services/picture';
import { SQLite } from '@ionic-native/sqlite';

//import { Network } from '@ionic-native/network';



@NgModule({
    declarations: [
        MessagesPage
    ],
    imports: [
        IonicPageModule.forChild(MessagesPage),
        MomentModule,
        IonicImageViewerModule
    ],
    providers: [
    //    Network,
        SQLite,
        PictureService
    ]
})
export class MessagesPageModule { }
