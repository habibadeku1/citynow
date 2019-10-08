import { Component, OnInit } from '@angular/core';
import { Alert, LoadingController, ToastController,AlertController, NavParams, Platform, ModalController, NavController, PopoverController, IonicPage } from 'ionic-angular';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { Profile, MyBadge, Message, Chat } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

//import { NewChatComponent } from '../chats/new-chat';

//import { MessagesPage } from '../messages/messages';



import { Pictures, Users, Chats, Messages, MyBadges } from 'api/collections';

import { Storage } from '@ionic/storage';

//import { Network } from '@ionic-native/network';

import numabbr from 'numabbr'

//import { LoginPage } from '../login/login';




@IonicPage()

@Component({
  selector: 'page4',
  templateUrl: 'page4.html'
})
export class Page4 implements OnInit {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  isGuest;

  rootNavCtrl: NavController;  

  chats;

  senderId;

  profile;
  
  picture; 

  fname;

  users;

  constructor(public loadingCtrl: LoadingController,private toast: ToastController, //private network: Network,
     private alertCtrl: AlertController, private platform: Platform, public navParams: NavParams, private modalCtrl: ModalController,private storage: Storage, public navCtrl: NavController, private popoverCtrl: PopoverController) {


    this.rootNavCtrl = navParams.get('rootNavCtrl');
    
    this.senderId = Meteor.userId();

    this.isGuest = Meteor.user()!=null  
    
    

  }

  ngOnInit(): void {


    }


  ngAfterViewInit() {

    //  this.superTabsCtrl.setBadge('page1', 5);

    }
    

    handleError(e: Error): void {
      
          console.error(e);
      
       
      
          const alert = this.alertCtrl.create({
      
            buttons: ['OK'],
      
            message: e.message,
      
            title: 'Oops!'
      
          }); 
      
       
      
          alert.present();
      
        }


          
  loginpage(): void {
    const alert = this.alertCtrl.create({
      title: 'Get a user account',
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

    //    this.viewCtrl.dismiss().then(() => {
    alert.present();
    //    });
  } 

  handleLogout(alert: Alert): void {

    this.storage.clear()

    alert.dismiss().then(() => {

      this.rootNavCtrl.push('LoginPage', {}, {
        animate: true
      });
      //  this.navCtrl.setRoot(LoginPage, {}, {
      //    animate: true
      //  });
    })
      .catch((e) => {
        this.handleError(e);
      });

  }



}
