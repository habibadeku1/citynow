
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HausaGroupPostEntry } from "../hausapage3/hausagrouppentry";

import { MomentModule } from 'angular2-moment';
import { Device } from '@ionic-native/device';
import { PictureService } from '../../services/picture'; 


@NgModule({
    declarations: [
        HausaGroupPostEntry
    ],
    imports: [
        IonicPageModule.forChild(HausaGroupPostEntry),
        MomentModule
    ],
    providers: [
        PictureService
    ]
})
export class HausaGroupPostEntryModule { }
