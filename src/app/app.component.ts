import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';  
import { Nav, Platform, NavController, App, AlertController, LoadingController, ToastController  } from 'ionic-angular';

//import { HoldPage } from '../pages/hold/hold';
//import { LoginPage } from '../pages/login/login'; 

import { Network } from '@ionic-native/network'; 

//import { FCM } from "@ionic-native/fcm";

import { MeteorObservable } from 'meteor-rxjs';

import { Meteor } from 'meteor/meteor';


declare var codePush: any;



@Component({
  templateUrl: 'app.html' 
})
export class MyApp  {
  
  @ViewChild(Nav) nav: Nav;
  
     rootPage: any;
     rootParams: any; 

     loading;

     public counter=0;
     
  
  
    rootNavCtrl: NavController;

  constructor(private network: Network, public loadingCtrl: LoadingController, private storage: Storage, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,public toastCtrl: ToastController) {

    console.log(Meteor.user());
    this.loadingon();

  this.storage.get('loguserz').then((val2) => {

    this.storage.get('logguestz').then((val3) => {
      
    if(this.network.type==='2g'||this.network.type==='4g'||this.network.type==='cellular'||this.network.type==='3g'||this.network.type==='wifi'||this.network.type==='ethernet'||this.network.type==='unknown' )
      {
    
    if(Meteor.user() || val2 || val3)
      {
        this.loadingoff();
        
        this.rootPage = 'HoldPage'
  
      }
    else if(!Meteor.user() || !val2 || !val3)
      {
        this.loadingoff();
        
        this.rootPage = 'LoginPage'  
  
      }
  
    }
  
//  else if(val2)
//      {
//        this.rootPage = HomePage      
  
//      }
  else if(!Meteor.user() || !val2 || !val3)
    {
  
      this.loadingoff();
      
      this.rootPage = 'LoginPage'  
  
    }
  
  
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
 //       this.platform.resume.subscribe(() => 
 //       codePush.sync(null, {deploymentKey: '0gG8uhxHcyEcJ2G6QwIfhYxQdu9t8d19542a-a764-4b48-aa75-ad058a557f63'}));
  
        if (this.platform.is('cordova')) {
          this.statusBar.overlaysWebView(false);          
          this.statusBar.backgroundColorByName("black");
        //  this.statusBar.styleBlackTranslucent();
          this.splashScreen.hide();


        //  setTimeout(() => {
        //    this.splashScreen.hide();
        //  }, 100);
  
        }
  
      //  this.platform.registerBackButtonAction(() => {
      //    if (this.nav.canGoBack())
      //      this.nav.pop().then(() => {}, () => {}); // If called very fast in a row, pop will reject because no pages
      //  }, 500);
      });
  
  
    })

  })
  
  
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

//ngOnInit(): void {



//}


}

