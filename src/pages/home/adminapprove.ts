import { Component, OnInit } from '@angular/core';

import { Chats, Users, CityPosts, GroupPosts } from 'api/collections';

import { User } from 'api/models';

import { AlertController, ToastController, Platform, ViewController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

//import { _ } from 'meteor/underscore';

import * as _ from 'lodash';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'adminapprove',

  templateUrl: 'adminapprove.html'

})

export class AdminApprovePostPage implements OnInit {

  senderId: string;

  usercity;

  cityarray;

  users;

  pcity;


  plists;

  glists;
  

  constructor(

    private alertCtrl: AlertController,

    private viewCtrl: ViewController,

    private platform: Platform, public toastCtrl: ToastController

  ) {

    this.senderId = Meteor.userId();

    this.usercity = Meteor.user().profile.pcity

    this.cityarray = Meteor.user().profile.mycities


  }



  ngOnInit() {

    this.pcity = Meteor.user().profile.pcity

    MeteorObservable.subscribe('plist').subscribe(() => {

      MeteorObservable.autorun().subscribe(() => {

        this.plists = this.findPList();

      });

    });


    MeteorObservable.subscribe('glist').subscribe(() => {

      MeteorObservable.autorun().subscribe(() => {

        this.glists = this.findGList();

      });

    });

  }





  approve(id: string): void {
    console.log(id)
    MeteorObservable.call('approvepost', id).subscribe({
      next: () => {

        let toast = this.toastCtrl.create({
          message: 'Post Approved successfully.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.viewCtrl.dismiss();
      },
      error: (e: Error) => {
        this.viewCtrl.dismiss().then(() => {
          this.handleError(e);
        });
      }
    });
  }

  approveg(id: string): void {
    console.log(id)
    MeteorObservable.call('approvegpost', id).subscribe({
      next: () => {

        let toast = this.toastCtrl.create({
          message: 'Post Approved successfully.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.viewCtrl.dismiss();
      },
      error: (e: Error) => {
        this.viewCtrl.dismiss().then(() => {
          this.handleError(e);
        });
      }
    });
  }


  findPList() {

    return CityPosts.find({ approved: false });
  }

  findGList() {
    
        return GroupPosts.find({ approved: false });
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



}