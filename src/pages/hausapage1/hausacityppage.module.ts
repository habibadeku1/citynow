
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaCityPostPage } from "../hausapage1/hausacityppage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { PictureService } from '../../services/picture'; 



@NgModule({
    declarations: [
        HausaCityPostPage
    ],
    imports: [
        IonicPageModule.forChild(HausaCityPostPage),
        MomentModule,
        EmojiPickerModule
    ],
    providers: [
        PictureService
    ]
})
export class HausaCityPostPageModule { }
