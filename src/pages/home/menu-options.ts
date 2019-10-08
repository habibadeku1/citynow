import { Component, Injectable } from '@angular/core';
import { App, LoadingController, ToastController,Alert, AlertController, NavController, ViewController } from 'ionic-angular';
import { LoginLogoutService } from '../../services/loginlogout';
//import { LoginPage } from '../login/login';
//import { ProfilePage } from '../profile/profile'; 
//import { AdminPostPage } from '../home/adminppage'; 

//import { HoldPage } from '../hold/hold'; 


import { MeteorObservable } from 'meteor-rxjs';


import { Observable, Subscriber, Subscription } from 'rxjs';


//import { AdminApprovePostPage } from '../home/adminapprove'; 

import { Network } from '@ionic-native/network';


import { Storage } from '@ionic/storage'; 
//declare var require: any;
//const localforage: LocalForage = require("localforage");

import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'menu-options',
  templateUrl: 'menu-options.html'
})
@Injectable()
export class MenuOptionsComponent {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  checklang;

  checkadmin;

  constructor(    public app: App,public loadingCtrl: LoadingController,private toast: ToastController, private network: Network, private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loginlogoutService: LoginLogoutService,
    private viewCtrl: ViewController
  ) {


    if(Meteor.user())

    this.checkadmin = Meteor.user().profile.usertype

    this.checklang = Meteor.user().profile.plang

  }

  editProfile(): void {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('ProfilePage');
    }); 
  } 

  adminpost(): void {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('AdminPostPage');
    }); 
  }

  approvepost(): void {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('AdminApprovePostPage');
    }); 
  }


  logout(): void {
    const alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you would like to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogout(alert);
            return false;
          }
        }
      ]
    });

    this.viewCtrl.dismiss().then(() => { 
      alert.present();
    });
  }

  handleLogout(alert: Alert): void {


    alert.dismiss().then(() => {

      this.loadingon()
      
  
    this.storage.clear()

      return this.loginlogoutService.logout();
    })
    .then(() => {


    Accounts.logout(function(err){ 
      console.log(err);
    });
    
    this.loadingoff();
      this.navCtrl.setRoot('LoginPage', {}, {
        animate: true
      });
    })
    .catch((e) => {
      this.handleError(e);
    });

  }


  updateLangH(): void {
    const alert = this.alertCtrl.create({
      title: 'Change Language',
      message: 'Are you sure you would like to change your language to Hausa?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleUpdateLangH(alert);
            return false;
          }
        }
      ]
    });

    this.viewCtrl.dismiss().then(() => { 
      alert.present();
    });
  }

  handleUpdateLangH(alert: Alert): void {
    

    alert.dismiss().then(() => {

      this.loadingon();

      MeteorObservable.call('updateLangH',).subscribe({
        
              next: () => {

                this.loadingoff();
        
                this.app.getRootNav().setRoot('HoldPage');

              },
        
              error: (e: Error) => {
        
                this.handleError(e);
        
              }
        
            }); 
        })

    .catch((e) => {
      this.handleError(e);
    });

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






  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }
}