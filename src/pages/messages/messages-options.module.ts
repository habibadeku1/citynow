import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MessagesOptionsComponent } from "../messages/messages-options";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';


@NgModule({
    declarations: [
        MessagesOptionsComponent
    ],
    imports: [
        IonicPageModule.forChild(MessagesOptionsComponent),
        MomentModule
    ],
 //   providers: [
 //     {provide: ErrorHandler, useClass: IonicErrorHandler},
 //     Device,
  
 //   ]
})
export class MessagesOptionsComponentModule { }
