import { Component, OnInit } from '@angular/core';

import { Chats, Users, Pictures, Thumbs, UserSearchs } from 'api/collections'; 

import { User, UserSearch} from 'api/models';

import { ToastController, LoadingController, AlertController, Platform, ViewController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

//import { _ } from 'meteor/underscore';

import * as _ from 'lodash';    

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

//import { Network } from '@ionic-native/network';

 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'new-chat',

  templateUrl: 'new-chat.html' 

})

export class NewChatComponent implements OnInit {
  searchPattern: BehaviorSubject<any>;

  senderId: string;

  usercity;

  cityarray;

  users;

  loading;

  connected: Subscription;
  disconnected: Subscription;
  
  

  pcity;

  usersSubscription: Subscription;

 

  constructor( public loadingCtrl: LoadingController, //private network: Network,

    private toast: ToastController,

    private alertCtrl: AlertController,

    private viewCtrl: ViewController,

    private platform: Platform

  ) {

//    MeteorObservable.call('forceaddp', Meteor.user() ).subscribe({
      
//      next: () => {

    this.senderId = Meteor.userId();

    console.log(this.senderId)

    this.usercity = Meteor.user().profile.pcity

    this.cityarray = Meteor.user().profile.mycities    

    this.searchPattern = new BehaviorSubject(undefined);

//  },
//  error: (e: Error) => {
//    this.handleError(e);
//  }
// });

  }

 

  ngOnInit() {

    this.pcity = Meteor.user().profile.pcity

    this.observeSearchBar();

  }

 

  updateSubscription(newValue) {

    this.searchPattern.next(newValue);

  }

 

  observeSearchBar(): void {

    this.searchPattern.asObservable()

    // Prevents the search bar from being spammed

      .debounce(() => Observable.timer(1000))

      .forEach(() => {

        if (this.usersSubscription) {

          this.usersSubscription.unsubscribe();

        }

        this.usersSubscription = this.subscribeUsers();

      }); 

  }


  addChat(user): void {
    MeteorObservable.call('addChat', user.userid).subscribe({
      next: () => {
        this.viewCtrl.dismiss();
      },
      error: (e: Error) => {
        this.viewCtrl.dismiss().then(() => {
          this.handleError(e);
        });
      }
    });
  }



    subscribeUsers(): Subscription {

    // Fetch all users matching search pattern

  //  console.log(this.searchPattern.getValue())

    const subscription = MeteorObservable.subscribe('users', this.searchPattern.getValue());

    const autorun = MeteorObservable.autorun();

    
    return Observable.merge(subscription, autorun).subscribe(() => {
      this.users = this.findUsers();

     // console.log(this.users) 
      
    });
  }

  findUsers() {
    // Find all belonging chats
    return Chats.find({
      memberIds: this.senderId  
    }, {
      fields: {
        memberIds: 1
      }
    })
    // Invoke merge-map with an empty array in case no chat found
    .startWith([])
    .mergeMap((chats) => {
      // Get all userIDs who we're chatting with
      const receiverIds = _.chain(chats)
        .map('memberIds')
        .flatten() 
        .concat(this.senderId)
        .value();

        const ucity = Meteor.user().profile.pcity



      // Find all users which are not in belonging chats
      return UserSearchs.find({
        userid: { $nin: receiverIds } ,  mycities: { $in: [ ucity ] }
      })
      // Invoke map with an empty array in case no user found
      .startWith([]);
    });
  }


//New code to remove subscriptions
  ionViewWillLeave(){
  //  this.searchPattern.unsubscribe();
    this.usersSubscription.unsubscribe();
  //  this.disconnected.unsubscribe();
  }



  handleError(e: Error): void {

    console.error(e);

 

    const alert = this.alertCtrl.create({

      buttons: ['OK'],

      message: e.message,

      title: 'Please check!'

    });

 

    alert.present();

  }

    getPic(thumbId): string {

    let platform = this.platform.is('android') ? "android" :

      this.platform.is('ios') ? "ios" : "";

    platform = this.platform.is('cordova') ? platform : "";

 

    return Thumbs.getThumbUrl(thumbId, platform);

  }

}