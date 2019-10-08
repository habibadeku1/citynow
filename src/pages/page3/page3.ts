import { Component, OnInit } from '@angular/core';
import { Alert, LoadingController, ToastController, AlertController, NavParams, NavController, PopoverController, IonicPage } from 'ionic-angular';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { Profile } from 'api/models';
import { Group } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { Groups } from 'api/collections';

//import { GroupPostsPage } from '../page3/groupppage';

//import { Network } from '@ionic-native/network';

import { Storage } from '@ionic/storage';

//import { LoginPage } from '../login/login';


@IonicPage()

@Component({
  selector: 'page3',
  templateUrl: 'page3.html'
})
export class Page3 implements OnInit {

  connected: Subscription;
  disconnected: Subscription;

  isGuest;

  loading;

  profile;

  picture;

  fname;

  usercity;

  userid;

  groups;

  groupposts;

  checkfollow;

  rootNavCtrl: NavController;


  constructor(public loadingCtrl: LoadingController, private toast: ToastController,// private network: Network,
     public navParams: NavParams, private storage: Storage, public navCtrl: NavController, private popoverCtrl: PopoverController, private alertCtrl: AlertController) {


    this.rootNavCtrl = navParams.get('rootNavCtrl');


  }



  ngOnInit(): void {

    MeteorObservable.call('forceaddp', "123").subscribe({

      next: () => {

        this.isGuest = !Meteor.user() 

        this.usercity = Accounts.user().profile.pcity


        this.userid = Accounts.user()._id


        MeteorObservable.subscribe('groups').subscribe(() => {

          MeteorObservable.autorun().subscribe(() => {

            this.groups = this.findGroups();

          });


        });

      },
      error: (e: Error) => {
        this.handleError(e);
      }
    });


  }

  findGroups() {

    return Groups.find({ cityname: this.usercity, citylang: Meteor.user().profile.plang }, {}).map(groups => {

      groups.forEach(group => {



        //this.checkfollow = group.followIds.includes(Accounts.user()._id)

        // this.checkfollow = Groups.findOne({ followIds: { $in: [ Accounts.user()._id ] } })

        //    this.findLastComment(citypost._id).subscribe((comment) => {

        //                citypost.lastComment = comment;

        //              });


      });

      return groups;

    });

  }


  showGroupPosts(group, localNavCtrl: boolean = false): void {

    //    MeteorObservable.call('removeMyBadge', group._id).subscribe({

    //      next: () => {

    //  console.log(group)

    if (localNavCtrl) {
      this.navCtrl.push('GroupPostsPage', { group });
    } else {
      this.rootNavCtrl.push('GroupPostsPage', { group });
    }


    //          },

    //            error: (e: Error) => {

    //              if (e) {

    // this.handleError(e); 

    //              }

    //            }

    //          });
    //          console.log(group)



  }


  ngAfterViewInit() {

    //  this.superTabsCtrl.setBadge('page1', 5);

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





  handleError(e: Error): void {

    console.error(e.message);

    console.error(e.stack);

    const alert = this.alertCtrl.create({

      title: 'Oops!',

      message: e.message,

      buttons: ['OK']

    });

    alert.present();

  }



}
