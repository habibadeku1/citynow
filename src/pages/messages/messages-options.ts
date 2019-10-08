import { Component } from '@angular/core';

import { LoadingController, AlertController, ToastController, NavController, NavParams, ViewController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

//import { HomePage } from '../home/home';

import { Observable, Subscriber, Subscription } from 'rxjs';

//import { Network } from '@ionic-native/network';

 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'messages-options',

  templateUrl: 'messages-options.html'

})

export class MessagesOptionsComponent {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  constructor(
    public loadingCtrl: LoadingController,private toast: ToastController,// private network: Network,

    public alertCtrl: AlertController,

    public navCtrl: NavController,

    public params: NavParams,

    public viewCtrl: ViewController, public toastCtrl: ToastController

  ) {}

 

  remove(): void {

    const alert = this.alertCtrl.create({

      title: 'Delete Chat',

      message: 'Are you sure you would like to proceed?',

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel'

        },

        {

          text: 'Yes',

          handler: () => {

            this.handleRemove(alert);

            return false;

          }

        }

      ]

    });

    this.viewCtrl.dismiss().then(() => {

      alert.present();

    });

  }

 

  private handleRemove(alert): void {

    MeteorObservable.call('removeChat', this.params.get('chat')._id).subscribe({

      next: () => {

        alert.dismiss().then(() => {

          let toast = this.toastCtrl.create({
            message: 'Chat deleted successfully.',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();

          this.navCtrl.setRoot('HomePage', {}, {

            animate: true

          });

        });

      },

      error: (e: Error) => {

        alert.dismiss().then(() => {

          if (e) {

            return this.handleError(e);

          }

          this.navCtrl.setRoot('HomePage', {}, {

            animate: true

          });

        });

      }

    });

  }




 

  private handleError(e: Error): void {

    console.error(e);

 

    const alert = this.alertCtrl.create({

      title: 'Oops!',

      message: e.message,

      buttons: ['OK']

    });

 

    alert.present();

  }

}