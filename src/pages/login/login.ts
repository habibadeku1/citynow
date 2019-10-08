import { Component, AfterContentInit } from '@angular/core';

import { LoadingController, ToastController, Alert, AlertController, NavController } from 'ionic-angular';

import { LoginLogoutService } from '../../services/loginlogout';

//import { VerificationPage } from '../verification/verification';

//import { SignupPage } from '../signup/signup';

//import { GuestupPage } from '../guestup/guestup';

import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { Network } from '@ionic-native/network';

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html'

})

export class LoginPage {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  user = '';

  password = '0000';

  constructor(public loadingCtrl: LoadingController,private toast: ToastController, private network: Network, 

    private alertCtrl: AlertController,

    private loginlogoutService: LoginLogoutService,

    private navCtrl: NavController

  ) {}

 

  onInputKeypress({keyCode}: KeyboardEvent): void {

    if (keyCode === 13) {

      this.login(),

      this.signup();

    }

  } 


    signup(): void {

      this.navCtrl.push('SignupPage') 

  }

  guestup(): void {
    
          this.navCtrl.push('GuestupPage') 
    
      }


  login(user: string = this.user): void {

    const alert = this.alertCtrl.create({

      title: 'Confirm',

      message: `Would you like to proceed with the email ${user}?`, 

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel'

        },

        {

          text: 'Yes',

          handler: () => {

            this.handleLogin(alert);

            return false;

          }

        }

      ]

    });

 

    alert.present();

  }

 

  handleLogin(alert: Alert): void {

    this.loadingon();
    alert.dismiss().then(() => {
      if (!this.user) { 

        this.loadingoff();
      throw new Meteor.Error('Field cannot be empty',

      '');
    }

    return this.loginlogoutService.verify(this.user, this.password);

    }).then(() => {

      this.loadingoff();
      
      this.navCtrl.push('VerificationPage', {
        
                user: this.user
                //pword: this.pword
              });

    })
 
    .catch((e) => {

      this.loadingoff();
      
      this.handleError(e);

    });

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
    

    
      ionViewWillLeave(){
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
      }

 

  handleError(e: Error): void {

    console.error(e); 

 

    const alert = this.alertCtrl.create({

      title: 'Please check!',

      message: "Invalid login credential, please try again.",

      buttons: ['OK']

    });

    alert.present();

  }

}