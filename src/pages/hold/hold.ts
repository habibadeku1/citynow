import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ViewController, Platform, AlertController, NavController, PopoverController, NavParams } from 'ionic-angular';


import { Observable, Subscriber, Subscription } from 'rxjs';

//import { HomePage } from '../home/home';

//import { HausaHomePage } from '../hausahome/hausahome';




import { Profile } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { Thumbs, Pictures, MyBadges, Groups, RegGuests } from 'api/collections';


import { Storage } from '@ionic/storage';

import { Device } from '@ionic-native/device';


import { IonicPage } from 'ionic-angular';

 


@IonicPage()
@Component({
    selector: 'hold',
    templateUrl: 'hold.html'
})
export class HoldPage {

    rootPage: any;

    loading;


    constructor(private device: Device, public loadingCtrl: LoadingController, private toast: ToastController, private viewCtrl: ViewController, private platform: Platform, private navParams: NavParams, public navCtrl: NavController, private popoverCtrl: PopoverController, private alertCtrl: AlertController) {

    //    MeteorObservable.call('forceaddp', "123").subscribe({

    //        next: () => {
                this.loadingon()

                MeteorObservable.subscribe('checkguest').subscribe(() => {




                    if (Meteor.user()) {

                        if (Meteor.user().profile.plang == 'English') {
                            this.loadingoff();
                            this.navCtrl.setRoot('HomePage');
                        }

                        else if (Meteor.user().profile.plang == 'Hausa') {
                            this.loadingoff();
                            
                            this.navCtrl.setRoot('HausaHomePage');

                        }

                    }
                    else if (!Meteor.user()) {
                        let checkit = RegGuests.findOne({ did: this.device.uuid })

                        console.log(checkit.plang)

                        if (checkit.plang == 'English') {
                            console.log("i went to english")
                            this.loadingoff();
                            
                            this.navCtrl.setRoot('HomePage');
                        }

                        else if (checkit.plang == 'Hausa') {
                            console.log("i went to hausa")
                            this.loadingoff();
                            
                            this.navCtrl.setRoot('HausaHomePage');

                        }
                    }


                })


    //        },
    //        error: (e: Error) => {
                // this.handleError(e);
    //        }
    //    });

    }

    loadingon(){
        this.loading = this.loadingCtrl.create({
          content: 'Loading', spinner: 'dots'
        });
        this.loading.present();
      }
      
      loadingoff()
      {
        this.loading.dismiss();
      }
  

}