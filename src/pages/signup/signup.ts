import { Component, OnInit,ViewChild } from '@angular/core';

import { LoadingController, ToastController, Alert, AlertController, NavController, ViewController } from 'ionic-angular';

import { LoginLogoutService } from '../../services/loginlogout';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { DefChatsPage } from '../chats/defchats';

//import { ProfilePage } from '../profile/profile';

import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscription, BehaviorSubject, Subscriber } from 'rxjs';

//import { VerificationPage } from '../verification/verification';

import { Users } from 'api/collections';

import { User } from 'api/models'; 

import { Network } from '@ionic-native/network';


//import template from './signup.html';

 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'signup',

  templateUrl: 'signup.html'

})

export class SignupPage {


  langDisabled = true;
  
      connected: Subscription;
      disconnected: Subscription;
  
      loading;
  
      selectOptions;
  
      selectOptions1;

  @ViewChild('joinaddSlider') joinaddSlider: any;
  
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
  
  defcity: string[] = ['Kaduna'];

  sel_defcity;

  emailgp = '';

  phonegp= '';
  
  fnamegp = '';
  
  snamegp = '';

  pcity = '';

  nname = '';  
    
  checkagree = false;

  checked : boolean = false;

  buttonsubmit: boolean;

  //buttonmodel = "disabled";

  submitAttempt: boolean = false;
 

  constructor( 
    private toast: ToastController, private network: Network,
    public loadingCtrl: LoadingController,

    private alertCtrl: AlertController,

    private loginlogoutService: LoginLogoutService,

    private navCtrl: NavController, public formBuilder: FormBuilder, private viewCtrl: ViewController

  ) {
 
    this.sel_defcity = "Kaduna"

    this.slideOneForm = formBuilder.group({
      fnamegp: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      snamegp: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      
    }); 

    this.slideTwoForm = formBuilder.group({
      pcity: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      plang: ['', Validators.compose([Validators.maxLength(10000), Validators.required])]      
      
    }); 

    this.slideThreeForm = formBuilder.group({
      nname: ['', Validators.compose([Validators.maxLength(50), Validators.required])],      
      emailgp: ['',Validators.compose([Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") ])], 
      phonegp: ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern("[0-9]*") ])],      
      
    });

    this.buttonsubmit = false;

    this.selectOptions = {
      title: 'Choose preferred city',
      //class: 'md'
    };

    this.selectOptions1 = {
      title: 'Choose preferred language',
      //class: 'md'
    };    
   

  }


  cityselect(value)
  {
      console.log(value)
      if(value="Kaduna")
        {
            this.langDisabled=false;
        }
  }

  getF1()
  {
    this.joinaddSlider.slideNext();
  }

  getF2()
  {
    this.joinaddSlider.slideNext();     
  }


  signup(e: Error){
    
       this.submitAttempt = true;
    
       if(!this.slideOneForm.valid){
           this.joinaddSlider.slideTo(0);
       }
       else if(!this.slideTwoForm.valid){
           this.joinaddSlider.slideTo(1);
       }
       else if(!this.slideThreeForm.valid){
        this.joinaddSlider.slideTo(2);
       }
       else {


    
      //    console.log(Meteor.status())
      //    console.log(Users.collection.find({username: this.slideThreeForm.get(['emailgp']).value}))

                   if(Users.collection.findOne({username: this.slideThreeForm.get(['emailgp']).value}))
                    {
                         //   console.log("User exists");

                    //     throw new Meteor.Error('User with email already exists!');
                         
                         const alert = this.alertCtrl.create({
                          
                                title: 'Please check!',
                          
                                message: "User with email already exists!",
                          
                                buttons: ['OK']
                          
                              });
                          
                              alert.present();
                         
                     
                          
      
                    }

                   else if(Users.collection.findOne({'profile.nname': this.slideThreeForm.get(['nname']).value}))
                    {
                         //   console.log("User exists");

                    //     throw new Meteor.Error('User with email already exists!');
                         
                         const alert = this.alertCtrl.create({
                          
                                title: 'Please check!',
                          
                                message: "Username already exists!",
                          
                                buttons: ['OK']
                          
                              });
                          
                              alert.present();
                         
                     
                          
      
                    }
                    else{

                      let loading = this.loadingCtrl.create({
                        content: 'Creating your profile...', spinner: 'dots'
                      }); 

                      let loading1 = this.loadingCtrl.create({
                        content: 'Creating your profile(In Hausa)...', spinner: 'dots'
                      }); 


                      if (this.slideTwoForm.get(['plang']).value =="English")
                      {

                      loading.present();

                      Accounts.createUser({
                      
                         // user: email,
                          username: this.slideThreeForm.get(['emailgp']).value,
                          
                          email: this.slideThreeForm.get(['emailgp']).value,
                          
                          password: "0000", 
                      
                          profile: {
                      
                            fname: this.slideOneForm.get(['fnamegp']).value,
                      
                            sname: this.slideOneForm.get(['snamegp']).value,
        
                            fsname: this.slideOneForm.get(['fnamegp']).value+this.slideOneForm.get(['snamegp']).value,
                            
                            nname: this.slideThreeForm.get(['nname']).value,
                            
                            phone: this.slideThreeForm.get(['phonegp']).value,
        
                            pcity: this.slideTwoForm.get(['pcity']).value,

                            plang: this.slideTwoForm.get(['plang']).value,
                            
                            usertype: "user",
                            
                            mycities: this.slideTwoForm.get(['pcity']).value,                     
                            
                            createdAt: new Date(),
                      
                          }
                          
                          });



                                    this.loginlogoutService.verify(this.slideThreeForm.get(['emailgp']).value, "0000").then(() => {

                                      console.log()
                                      
                                      MeteorObservable.call('usersearch', this.slideThreeForm.get(['emailgp']).value, this.slideThreeForm.get(['nname']).value, this.slideOneForm.get(['fnamegp']).value, this.slideOneForm.get(['snamegp']).value,this.slideOneForm.get(['fnamegp']).value+this.slideOneForm.get(['snamegp']).value,this.slideTwoForm.get(['pcity']).value).subscribe({
                                        next: () => {

                                        },
                                        error: (e: Error) => {
                                          //this.viewCtrl.dismiss().then(() => {
                                          //  this.handleError(e);
                                          //});
                                        }
                                      });                      
                                      
                                             }).then(() => {

                                              this.navCtrl.push('VerificationPage', {
                                                
                                                        user: this.slideThreeForm.get(['emailgp']).value
                                                        //pword: this.pword
                                                        });
                                  
                                                        loading.dismiss() 


                                             })

                            }
                            

                      else if (this.slideTwoForm.get(['plang']).value =="Hausa")
                        {
  
                        loading1.present();
  
                        Accounts.createUser({
                        
                           // user: email,
                            username: this.slideThreeForm.get(['emailgp']).value,
                            
                            email: this.slideThreeForm.get(['emailgp']).value,
                            
                            password: "0000", 
                        
                            profile: {
                        
                              fname: this.slideOneForm.get(['fnamegp']).value,
                        
                              sname: this.slideOneForm.get(['snamegp']).value,
          
                              fsname: this.slideOneForm.get(['fnamegp']).value+this.slideOneForm.get(['snamegp']).value,
                              
                              nname: this.slideThreeForm.get(['nname']).value,
                              
                              phone: this.slideThreeForm.get(['phonegp']).value,
          
                              pcity: this.slideTwoForm.get(['pcity']).value,
  
                              plang: this.slideTwoForm.get(['plang']).value,
                              
                              usertype: "user",
                              
                              mycities: this.slideTwoForm.get(['pcity']).value,                     
                              
                              createdAt: new Date(),
                        
                            }
                            
                            });
  
  
  
                                      this.loginlogoutService.verify(this.slideThreeForm.get(['emailgp']).value, "0000").then(() => {
  
                                        console.log()
                                        
                                        MeteorObservable.call('usersearch', this.slideThreeForm.get(['emailgp']).value, this.slideThreeForm.get(['nname']).value, this.slideOneForm.get(['fnamegp']).value, this.slideOneForm.get(['snamegp']).value,this.slideOneForm.get(['fnamegp']).value+this.slideOneForm.get(['snamegp']).value,this.slideTwoForm.get(['pcity']).value).subscribe({
                                          next: () => {
  
                                          },
                                          error: (e: Error) => {
                                            //this.viewCtrl.dismiss().then(() => {
                                            //  this.handleError(e);
                                            //});
                                          }
                                        });                      
                                        
                                               }).then(() => {
  
                                                this.navCtrl.push('VerificationPage', {
                                                  
                                                          user: this.slideThreeForm.get(['emailgp']).value
                                                          //pword: this.pword
                                                          });
                                    
                                                          loading1.dismiss() 
  
  
                                               })
  
                              }
                              

                                  
                      

        
                    }
        

     
          }
    
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

      message: e.message,

      buttons: ['OK']

    });

 

    alert.present();

  }


}