import { ElementRef,ViewChild, Component } from '@angular/core';

import { ViewController, LoadingController, ToastController, AlertController, NavController, Platform, Nav, NavParams } from 'ionic-angular';

//import { HoldPage } from '../hold/hold';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginLogoutService } from '../../services/loginlogout';

import { MeteorObservable } from 'meteor-rxjs';

import { Storage } from '@ionic/storage';

import { Observable, Subscription, BehaviorSubject, Subscriber } from 'rxjs';


import { Network } from '@ionic-native/network';

import { Device } from '@ionic-native/device';


//import { NetErrPage } from '../neterrpage/neterrpage';

//import { Network } from '@ionic-native/network';

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'guestup',

  templateUrl: 'guestup.html'

})

export class GuestupPage {

 //   @ViewChild('sellangid') myInput: ElementRef;    

    cityname;

    langDisabled = true;

    connected: Subscription;
    disconnected: Subscription;

    loading;

    selectOptions;

    selectOptions1;
    
    eForm1: FormGroup;
    
    submitAttempt: boolean = false;

  constructor( private device: Device,
    private toast: ToastController, private network: Network,
    public loadingCtrl: LoadingController,
    private storage: Storage, 
    
        private alertCtrl: AlertController,
    
        private navCtrl: NavController,
    
        private navParams: NavParams,
    
        private loginlogoutService: LoginLogoutService , public formBuilder: FormBuilder, private viewCtrl: ViewController
    
      ) {

        
        this.eForm1 = formBuilder.group({ 
            
                  pcity: ['', Validators.compose([Validators.maxLength(1000), Validators.required])],
                  plang: ['', Validators.compose([Validators.maxLength(10000), Validators.required])]
                  
                });

                this.selectOptions = {
                    title: 'Choose preferred city',
                    //class: 'md'
                  };

                  this.selectOptions1 = {
                    title: 'Choose preferred language',
                    //class: 'md'
                  };
                  
        this.cityname = "Kaduna"

        console.log('Device UUID is: ' + this.device.uuid);        
        
        console.log('Platform is: ' + this.device.platform);
        
        console.log('Cordova is: ' + this.device.cordova);    
        
        
        
        
      }

      cityselect(value)
      {
          console.log(value)
          if(value="Kaduna")
            {
                this.langDisabled=false;
            }
      }


      guestup()
      {
        this.loadingon()
        this.submitAttempt = true;

        if(!this.eForm1.valid){
          //this.joinaddSlider.slideTo(0);
        }

        else {

          MeteorObservable.call('regguestupdate', this.device.uuid, this.device.platform, this.device.cordova,this.eForm1.get(['pcity']).value,this.eForm1.get(['plang']).value).subscribe({
              next: () => {
  
                  this.loadingoff()
                  this.navCtrl.setRoot('HoldPage');                  
                  
              },
              error: (e: Error) => {
                //this.viewCtrl.dismiss().then(() => {
                //  this.handleError(e);
                //});
              } 
            }); 
          }



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
         if(Meteor.user())
          {
          this.loadingcon();
          }
          else{
            this.loadingdiscon();
          }      
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
    
    
      displayNetworkUpdate(connectionState: string){
        let networkType = this.network.type;
        this.toast.create({
          message: `You are now ${connectionState} via ${networkType}`,
          duration: 3000
        }).present();
      }
    
    
      ionViewWillLeave(){
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
      }

  


}