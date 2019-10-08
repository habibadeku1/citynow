
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { GroupPostEntry } from "../page3/grouppentry";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { PictureService } from '../../services/picture'; 


@NgModule({
    declarations: [
        GroupPostEntry
    ],
    imports: [
        IonicPageModule.forChild(GroupPostEntry),
        MomentModule,
        EmojiPickerModule
    ],
    providers: [
        PictureService
    ]
})
export class GroupPostEntryModule { }
