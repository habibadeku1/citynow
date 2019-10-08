import { Component, OnInit } from '@angular/core';

import { Profile } from 'api/models';

import { App, ViewController, AlertController, NavController, Platform, LoadingController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

import { PictureService } from '../../services/picture';

import { Pictures } from 'api/collections';

//import { HomePage } from '../home/home';

//import { HoldPage } from '../hold/hold';


//import Ground from 'meteor/ground:db';


import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({

  selector: 'profile',

  templateUrl: 'profile.html'

})

export class ProfilePage implements OnInit {

  picture;

  thumb;

  profile: Profile;



  constructor(public app: App, public loadingCtrl: LoadingController, public viewCtrl: ViewController,

    private alertCtrl: AlertController,

    private navCtrl: NavController,

    private pictureService: PictureService,

    private platform: Platform

  ) { }



  ngOnInit(): void {

    this.profile = Meteor.user().profile || { fname: '', sname: '', phone: '', sex: '', sigtext: '', nname: '' };



    MeteorObservable.subscribe('userfull').subscribe(() => {

      let platform = this.platform.is('android') ? "android" :

        this.platform.is('ios') ? "ios" : "";

      platform = this.platform.is('cordova') ? platform : "";

      this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform);

    });

  }



  selectProfilePicture(): void {


    this.pictureService.selectprofile(false, true).then((blob) => {
      let loading = this.loadingCtrl.create({
        content: 'Loading image, Please wait...', spinner: 'bubbles'
      });

      loading.present();
      this.uploadProfilePicture(blob);
      loading.dismiss()

    })
      .catch((e) => {
      //  loading.dismiss()

        this.handleError(e);
      });

  }



  uploadProfilePicture(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((picture) => {

      this.profile.pictureId = picture._id;

      this.picture = picture.url;

      if (picture) {
        loading.dismiss()
      }


    })

      .catch((e) => {

        loading.dismiss()

        this.handleError(e);


      });

  }



  updateProfile(): void {

    MeteorObservable.call('updateProfile', this.profile).subscribe({

      next: () => {

        this.viewCtrl.dismiss();
        this.navCtrl.setRoot('HoldPage');

        //    this.app.getRootNav().setRoot(HoldPage); 
        //  this.navCtrl.push(HomePage);

      },

      error: (e: Error) => {

        this.handleError(e);

      }

    });

  }



  handleError(e: Error): void {

    console.error(e);

    const alert = this.alertCtrl.create({

      title: 'Please check!',

      message: 'This was stopped',

      buttons: ['OK']

    });

    alert.present();

  }

}