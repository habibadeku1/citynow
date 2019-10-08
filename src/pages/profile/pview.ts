import { Component, OnInit } from '@angular/core';

import { Profile, CityPost } from 'api/models';

import { NavParams, ViewController, AlertController, NavController, Platform, LoadingController } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

import { PictureService } from '../../services/picture';

import { Pictures, Users } from 'api/collections';

//import { HomePage } from '../home/home'; 


import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({

  selector: 'pview',

  templateUrl: 'pview.html'

})

export class ProfileViewPage implements OnInit {

  picture: string;

  thumb;

  profile: Profile; 

  user;

  fname;

  sname;

  sigtext;

  nname;

  selectedCity: CityPost;
  

 

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController,

    private alertCtrl: AlertController,

    private navCtrl: NavController,

    private navParams: NavParams,    

    private pictureService: PictureService,

    private platform: Platform

  ) {

    this.selectedCity = <CityPost>navParams.get('citypost');

    console.log(this.selectedCity.posterid)
    
  }

 

  ngOnInit(): void { 

  //  this.profile = Meteor.user().profile || { fname: '',sname: '',phone: '',sex: '',sigtext: '' };

 

    MeteorObservable.subscribe('profileview', this.selectedCity.posterid).subscribe(() => { 
      MeteorObservable.autorun().subscribe(() => {
        

                          this.profile = Users.findOne({_id:this.selectedCity.posterid}).profile || { fname: '', sname: '', sigtext: '', nname: '' };
                  
                         // this.fname = Meteor.user().profile.fname
        

                          console.log(this.profile.sigtext)

                          this.fname = this.profile.fname

                          this.sname = this.profile.sname

                          this.sigtext = this.profile.sigtext

                          this.nname = this.profile.nname
                          
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