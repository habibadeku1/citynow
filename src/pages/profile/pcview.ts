import { Component, OnInit } from '@angular/core';

import { Profile, CityPost, CityCom } from 'api/models';

import { NavParams, ViewController, AlertController, NavController, Platform, LoadingController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

import { PictureService } from '../../services/picture';

import { Pictures, Users } from 'api/collections';

//import { HomePage } from '../home/home'; 


import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({

  selector: 'pcview',

  templateUrl: 'pcview.html'

})

export class ProfileCViewPage implements OnInit {

  picture: string;

  thumb;

  profile: Profile; 

  user;

  fname;

  sname;

  sigtext;

  selectedCity: CityCom;
  

 

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController,

    private alertCtrl: AlertController,

    private navCtrl: NavController,

    private navParams: NavParams,    

    private pictureService: PictureService,

    private platform: Platform

  ) {

    this.selectedCity = <CityCom>navParams.get('citycom');

    console.log(this.selectedCity.senderId)
    
  }

 

  ngOnInit(): void { 

  //  this.profile = Meteor.user().profile || { fname: '',sname: '',phone: '',sex: '',sigtext: '' };

 

    MeteorObservable.subscribe('profileview', this.selectedCity.senderId).subscribe(() => { 
      MeteorObservable.autorun().subscribe(() => {
        

                          this.profile = Users.findOne({_id:this.selectedCity.senderId}).profile || { fname: '', sname: '', sigtext: '' };
                  
                         // this.fname = Meteor.user().profile.fname
        

                          console.log(this.profile.sigtext)

                          this.fname = this.profile.fname

                          this.sname = this.profile.sname

                          this.sigtext = this.profile.sigtext
                          
        //                  this.fname = Meteor.user().profile.fname
        
        
                          let platform = this.platform.is('android') ? "android" :
                          
                                  this.platform.is('ios') ? "ios" : "";
                          
                                platform = this.platform.is('cordova') ? platform : "";  
                          
                                this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform);

      })         
    })

  }


  getPic(pictureId): string {
    
        let platform = this.platform.is('android') ? "android" :
    
          this.platform.is('ios') ? "ios" : "";
    
        platform = this.platform.is('cordova') ? platform : "";
    
        return Pictures.getPictureUrl(pictureId, platform);
    
      }
    



  handleError(e: Error): void {

    console.error(e);

    const alert = this.alertCtrl.create({

      title: 'Oops!',

      message: 'Something went wrong. Seems the file is not compatible',

      buttons: ['OK']

    });

    alert.present();

  }

}