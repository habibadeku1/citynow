import { Component } from '@angular/core';

import { AlertController, Platform, ModalController, ViewController } from 'ionic-angular';

import { MessageType } from 'api/models';

import { PictureService } from '../../services/picture';

 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'messages-attachments',

  templateUrl: 'messages-attachments.html'

})

export class MessagesAttachmentsComponent {

  constructor(

    private alertCtrl: AlertController,

    private platform: Platform,

    private viewCtrl: ViewController,

    private modelCtrl: ModalController,

    private pictureService: PictureService

  ) {}

    sendPicture(): void {

      this.pictureService.select().then((blob) => {        
      this.viewCtrl.dismiss({

        messageType: MessageType.PICTURE,

      //  selectedPicture: file

      });

    });

  }

 



}