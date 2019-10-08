import { Component, OnInit, Injectable } from '@angular/core';
import { PopoverController, ToastController, Alert, AlertController, NavController, ViewController, NavParams } from 'ionic-angular';
import { LoginLogoutService } from '../../services/loginlogout';
//import { LoginPage } from '../login/login';
//import { ProfilePage } from '../profile/profile'; 
//import { AdminPostPage } from '../home/adminppage'; 

import { MeteorObservable } from 'meteor-rxjs';

import { CityPost, CityCom, MessageType, } from 'api/models';

import  { CityPosts, CityComs, Users, Pictures } from 'api/collections';

//import { ReportPost } from './reportpost';




import { Storage } from '@ionic/storage'; 
//declare var require: any;
//const localforage: LocalForage = require("localforage");

import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page1menu-options',
  templateUrl: 'page1menu-options.html'
})

export class PageMenuOptionsComponent implements OnInit {

  checkadmin;

  selectedCity: CityPost;
  
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

      this.selectedCity = <CityPost>navParams.get('citypost');

      console.log(this.selectedCity)

      if(this.selectedCity.posterid == Meteor.userId())

        {
          this.checkuser = true;
        }
      
      this.checkadmin = Meteor.user().profile.usertype


      MeteorObservable.subscribe('cityposts').subscribe(() => { 
        
              MeteorObservable.autorun().subscribe(() => {
        
                this.checkf = CityPosts.findOne( { followIds: { $in: [ Accounts.user()._id ] }, _id:this.selectedCity._id })
  
              });
  
      });


  }

  ngOnInit() {




      }

  deletePost(): void {
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

  presentToast2() {
    let toast = this.toastCtrl.create({
      message: 'You are now following this post.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  presentToast3() {
    let toast = this.toastCtrl.create({
      message: 'You have now unfollowed this post.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  handleDelete(alert: Alert): void {
    
    alert.dismiss().then(() => {

      MeteorObservable.call('deletePost', this.selectedCity.cpid
      
          ).zone().subscribe(() => {
      
          });    })

    .then(() => {

      this.presentToast()      
      
    })
    .catch((e) => {
      this.handleError(e);
    });

  }

  followPost(): void {
    const alert = this.alertCtrl.create({
      title: 'Follow post',
      message: 'By following this post, you will receive notifications for comments and actions on this post.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleFollow(alert);
            return false;
          }
        }
      ]
    });

    this.viewCtrl.dismiss().then(() => {
      alert.present();
    });
  } 

  handleFollow(alert: Alert): void {
    
    alert.dismiss().then(() => {

      MeteorObservable.call('followPost', this.selectedCity._id
      
          ).zone().subscribe(() => {
      
          });    })

    .then(() => {

      this.presentToast2()      
      
    })
    .catch((e) => {
      this.handleError(e);
    });

  }



  unfollowPost(): void {
    const alert = this.alertCtrl.create({
      title: 'Unfollow post',
      message: 'By unfollowing this post, you will no longer receive notifications for comments and actions on this post.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleunFollow(alert);
            return false;
          }
        }
      ]
    });

    this.viewCtrl.dismiss().then(() => {
      alert.present();
    });
  } 

  handleunFollow(alert: Alert): void {
    
    alert.dismiss().then(() => {

      MeteorObservable.call('unfollowPost', this.selectedCity._id
      
          ).zone().subscribe(() => {
      
          });    })

    .then(() => {

      this.presentToast3()      
      
    })
    .catch((e) => {
      this.handleError(e);
    });

  }



  reportPost(cityid, localNavCtrl: boolean = false): void { 

    console.log(cityid)
    const popover = this.popoverCtrl.create('ReportPost', {cityid}, {
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