
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { CityPostPage } from "../page1/cityppage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { PictureService } from '../../services/picture'; 




@NgModule({
    declarations: [
        CityPostPage
    ],
    imports: [
        IonicPageModule.forChild(CityPostPage),
        MomentModule,
        EmojiPickerModule
    ],
    providers: [
        PictureService
    ]
})
export class CityPostPageModule { }
