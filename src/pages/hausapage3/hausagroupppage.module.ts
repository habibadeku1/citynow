import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaGroupPostsPage } from "../hausapage3/hausagroupppage";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';



@NgModule({
    declarations: [
        HausaGroupPostsPage
    ],
    imports: [
        IonicPageModule.forChild(HausaGroupPostsPage),
        MomentModule,
        EmojiPickerModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class HausaGroupPostsPageModule { }
