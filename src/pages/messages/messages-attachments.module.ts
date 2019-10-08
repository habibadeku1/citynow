import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MessagesAttachmentsComponent } from "../messages/messages-attachments";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { PictureService } from '../../services/picture'; 


@NgModule({
    declarations: [
        MessagesAttachmentsComponent
    ],
    imports: [
        IonicPageModule.forChild(MessagesAttachmentsComponent),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class MessagesAttachmentsComponentModule { }
