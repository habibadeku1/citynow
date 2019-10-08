import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Users, Pictures } from 'api/collections';

import { Profile, CityPost } from 'api/models';

import { ToastController, LoadingController, ViewController,  NavController, PopoverController, ModalController, AlertController, Platform, IonicPage, NavParams } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

//import { PictureService } from '../../services/picture'; 

import { Random } from 'meteor/random'




@IonicPage()
@Component({
  selector: "hausareportpost",
  templateUrl: "hausareportpost.html" 


})
export class HausaReportPost implements OnInit {

 // @ViewChild('eSlider') eSlider: any;

  selectedCity; 

  cpid;

  picture;


  item: FormControl;

  eForm1: FormGroup;

  submitAttempt: boolean = false;

  updescr;

  senderId: string;

  profile: Profile;

  rootNavCtrl: NavController;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, private alertCtrl: AlertController,
  public navParams: NavParams,    private viewCtrl: ViewController,
  private platform: Platform, public formBuilder: FormBuilder,
//  private pictureService: PictureService  
) 
  {

    this.selectedCity = navParams.get('cityid');    

    this.updescr = ""

    this.eForm1 = formBuilder.group({

      updescr: ['', Validators.compose([Validators.maxLength(10000), Validators.required])],
      
    });

    console.log(this.selectedCity)

  }

/**  ionViewWillLoad() {
    this.item = this.formBuilder.control('');

    this.eForm1 = this.formBuilder.group({
      updescr: this.item      
  });
  
  }  **/

  ngOnInit() {



//    MeteorObservable.call('forceaddp', Meteor.user() ).subscribe({
      
//      next: () => {

      this.profile = Meteor.user().profile || { fname: '', sname: '', pcity: '', plang: '' };
      
         MeteorObservable.subscribe('user').subscribe(() => {
          
              MeteorObservable.autorun().subscribe(() => {
          
                let platform = this.platform.is('android') ? "android" :
          
                  this.platform.is('ios') ? "ios" : "";
          
                platform = this.platform.is('cordova') ? platform : "";   
          
                this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform); 
      
                
              }) 
              });
  
        
  /**    },
      error: (e: Error) => {
        this.handleError(e);
      }
     });  
**/

 

  }


    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'You have successfully reported this post to Citydiary admin',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }

  //  handleSelection(event) {
  //    this.updescr = this.updescr + " " + event.char;
  //  }

  
    save() 
    {

    this.submitAttempt = true; 
 
    if(!this.eForm1.valid){
        return;
    }
    else {

     // this.cpid = Random.id()      

     MeteorObservable.call('reportPost',this.profile.pcity,this.profile.plang,this.eForm1.get(['updescr']).value, this.profile.fname, this.profile.sname, this.profile.picture, this.profile.pictureId, this.selectedCity ).subscribe({
      
      next: () => {

      this.viewCtrl.dismiss(); 

      this.presentToast()      
        
      },
      error: (e: Error) => {
        this.handleError(e);
      }
     }); 
    


    } 

   }

   toggled: boolean = false;
   emojitext: string;
    
   handleSelection(event) {
     this.updescr = this.updescr + " " + event.char;
   }
 
  handleError(e: Error): void {

    console.error(e.message);

    console.error(e.stack);

    const alert = this.alertCtrl.create({

      title: 'Please check!',

      message: e.message,

      buttons: ['OK']

    });

    alert.present();

  }



}