import { Component } from '@angular/core';

import { LoadingController, ToastController, AlertController, NavController, Platform, Nav, NavParams } from 'ionic-angular';

//import { HoldPage } from '../hold/hold';

import { LoginLogoutService } from '../../services/loginlogout';

import { MeteorObservable } from 'meteor-rxjs';

import { Storage } from '@ionic/storage';

import { Observable, Subscription, BehaviorSubject, Subscriber } from 'rxjs';


import { Network } from '@ionic-native/network';


//import { NetErrPage } from '../neterrpage/neterrpage';

//import { Network } from '@ionic-native/network';

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'verification',

  templateUrl: 'verification.html'

})

export class VerificationPage {

  code = '';

  user: string;

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

 // pword;


  constructor( 
    private toast: ToastController, private network: Network,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    
        private alertCtrl: AlertController,
    
        private navCtrl: NavController,
    
        private navParams: NavParams,
    
        private loginlogoutService: LoginLogoutService , 
    
      ) {

        this.user = this.navParams.get('user');
        
      }


  onInputKeypress({keyCode}: KeyboardEvent): void {

    if (keyCode === 13) {
 
      this.verify();
 
    } 

  }

 
verify(): void {

  this.loadingon();

  this.loginlogoutService.login(this.code, this.user).then(() => {

      console.log(Meteor.user())
      this.storage.set("loguserz", Meteor.user()).then(() => 
      
      {
        this.loadingoff();
        this.navCtrl.push('HoldPage');                 
        

      });

    
        }).catch((e) => {

          this.loadingoff();
          
          this.handleError(e);
    
              console.error(e);
    
        });
 
  }



  handleError(e: Error): void {

    console.error(e);

 

    const alert = this.alertCtrl.create({

      title: 'Please check!',

      message: e.message,

      buttons: ['OK']

    });

 

    alert.present();

  }

  
  ionViewDidEnter() {
    
    
        this.connected = this.network.onConnect().subscribe(data => {
           
          console.log(Meteor.user())

          this.loadingcon();
   
          //this.displayNetworkUpdate(data.type); 
        }, error => console.error(error));
       
    
        this.disconnected = this.network.onDisconnect().subscribe(data => {
        //  console.log(data)
          this.loadingdiscon();
        //  this.displayNetworkUpdate(data.type);
        }, error => console.error(error)); 
      }
    
    
      loadingdiscon(){
        this.loading = this.loadingCtrl.create({
          content: 'You do not seem to be connected to the internet, please check your network', spinner: 'dots'
        });
        this.loading.present();
      }
    
      loadingcon()
      {
        this.loading.dismiss();
      }

      loadingon(){
        this.loading = this.loadingCtrl.create({
          content: 'Logging in', spinner: 'dots'
        });
        this.loading.present();
      }
      
      loadingoff()
      {
        this.loading.dismiss();
      }
    

    
      ionViewWillLeave(){
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
      }

  


}