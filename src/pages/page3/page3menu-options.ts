import { Component, OnInit, Injectable } from '@angular/core';
import { PopoverController, ToastController, Alert, AlertController, NavController, ViewController, NavParams } from 'ionic-angular';
import { LoginLogoutService } from '../../services/loginlogout';
//import { LoginPage } from '../login/login';
//import { ProfilePage } from '../profile/profile'; 
import { AdminPostPage } from '../home/adminppage'; 

import { MeteorObservable } from 'meteor-rxjs';

import { GroupPost, GroupCom, MessageType, } from 'api/models';

import  { GroupPosts, GroupComs, Users, Pictures } from 'api/collections';

//import { ReportPost3 } from './reportpost'; 





import { Storage } from '@ionic/storage'; 
//declare var require: any;
//const localforage: LocalForage = require("localforage");

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page3menu-options',
  templateUrl: 'page3menu-options.html'
})

export class PageMenuOptionsComponent3 implements OnInit {

  checkadmin;

  selectedCity: GroupPost;
  
  checkuser;

  checkf;

  constructor(public toastCtrl: ToastController,
    private navParams: NavParams,    
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loginlogoutService: LoginLogoutService,
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController
  ) 
  {

      this.selectedCity = <GroupPost>navParams.get('grouppost');

      console.log(this.selectedCity)

      if(this.selectedCity.posterid == Meteor.userId())

        {
          this.checkuser = true;
        }
      
      this.checkadmin = Meteor.user().profile.usertype


  }

  ngOnInit() {




      }

  deleteGPost(): void {
    const alert = this.alertCtrl.create({
      title: 'Delete post',
      message: 'Are you sure you would like to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleDelete(alert);
            return false;
          }
        }
      ]
    });

    this.viewCtrl.dismiss().then(() => {
      alert.present();
    });
  } 

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Post deleted successfully.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }


  handleDelete(alert: Alert): void {
    
    alert.dismiss().then(() => {

      MeteorObservable.call('deleteGPost', this.selectedCity.gpid
      
          ).zone().subscribe(() => {
      
          });    })

    .then(() => {

      this.presentToast()      
      
    })
    .catch((e) => {
      this.handleError(e);
    });

  }


  reportPost(cityid, localNavCtrl: boolean = false): void { 

    console.log(cityid)
    const popover = this.popoverCtrl.create('ReportPost3', {cityid}, {
    });

    popover.present(); 
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