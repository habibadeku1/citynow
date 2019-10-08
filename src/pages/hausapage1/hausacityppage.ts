import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Thumbs, Users, Pictures } from 'api/collections';

import { Profile } from 'api/models';

import { ToastController, LoadingController, ViewController,  NavController, PopoverController, ModalController, AlertController, Platform, NavParams } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

import { PictureService } from '../../services/picture'; 

import { Random } from 'meteor/random'

import { Observable, Subscriber, Subscription } from 'rxjs';


//import { Network } from '@ionic-native/network';



import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: "hausacityppage",
  templateUrl: "hausacityppage.html" 


})
export class HausaCityPostPage implements OnInit {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

 // @ViewChild('eSlider') eSlider: any;

 item: FormControl;
 

  cpid;

  picture;

  thumb;  

  image1;

  upthumb: string;
  
  upthumbId: string;

  uppic: string;

  uppictureId: string;


  image2;
  
  uppic2: string;
  
  uppictureId2: string;


  image3;
    
  uppic3: string;
    
  uppictureId3: string;


  eForm1: FormGroup;

  submitAttempt: boolean = false;

  uptitle;

  upsource;

  updescr;

  senderId: string;

  profile: Profile;

  rootNavCtrl: NavController;

  constructor(private toast: ToastController,// private network: Network,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, private alertCtrl: AlertController,
  public navParams: NavParams,    private viewCtrl: ViewController,
  private platform: Platform, public formBuilder: FormBuilder,
  private pictureService: PictureService  
) 
  {

    this.updescr = ""

    this.eForm1 = formBuilder.group({

      uptitle: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr: ['', Validators.compose([Validators.maxLength(10000), Validators.required])],
      upsource: ['', Validators.compose([Validators.maxLength(1000)])],
      html: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid: ['', Validators.compose([Validators.maxLength(1000)])]
      
      
    });

  }

 // ionViewWillLoad() {
 //   this.item = this.formBuilder.control('');

 //   this.eForm1 = this.formBuilder.group({
 //     updescr: this.item ,
           
 // });
  
//  }  



  ngOnInit() {
    

//    MeteorObservable.call('forceaddp', Meteor.user() ).subscribe({
      
//      next: () => {

      this.profile = Meteor.user().profile || { fname: '', sname: '', pcity: '', plang: '' };
      
      MeteorObservable.subscribe('userfull').subscribe(() => {
        
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



  selectUploadPicture(): void { 
    
    this.pictureService.select().then((blob) => {  
      let loading = this.loadingCtrl.create({
        content: 'Loading image 1, Please wait...', spinner: 'bubbles'
      }); 
  
      loading.present();  
          this.uploadPicture(blob);
          loading.dismiss()
          
    
        })
    
          .catch((e) => {
    
            this.handleError(e); 
    
          });
    
      }
    
     
    
    uploadPicture(blob: any): void { 
  
      let loading = this.loadingCtrl.create({
        content: 'Loading image 1, Please wait...', spinner: 'bubbles'
      }); 
  
      loading.present();
  
      this.pictureService.upload(blob).then((uppic) => {
        
          this.uppictureId = uppic._id;
    
          this.uppic = uppic.url;
              
                       if(uppic)
                        {
                          this.image1 = "Image 1 loaded succesfully"
                          loading.dismiss()
                        }
                    
                  
            
          })
          .catch((e) => {
            loading.dismiss()
            
            this.handleError(e);
    
          });
    
    }

    selectUploadPicture2(): void {
    
      this.pictureService.select().then((blob) => {  
          
      let loading = this.loadingCtrl.create({
        content: 'Loading image 2, Please wait...', spinner: 'bubbles'
      }); 
  
      loading.present();  
          this.uploadPicture2(blob);
          loading.dismiss()
          
    
        })
    
          .catch((e) => {
    
            this.handleError(e); 
    
          });
    
      }
    
     
    
    uploadPicture2(blob: any): void { 
  
      let loading = this.loadingCtrl.create({
        content: 'Loading image 2, Please wait...', spinner: 'bubbles'
      }); 
  
      loading.present();
  
        this.pictureService.upload(blob).then((uppic2) => {
    
          this.uppictureId2 = uppic2._id;
    
          this.uppic2 = uppic2.url;
  
          if(uppic2)
            {
              this.image2 = "Image 2 loaded succesfully"
              loading.dismiss()
            }
    
        })  
          .catch((e) => {
    
            this.handleError(e);
    
          });
    
    }



    selectUploadPicture3(): void {
      
      this.pictureService.select().then((blob) => { 
        
        let loading = this.loadingCtrl.create({
          content: 'Loading image 3, Please wait...', spinner: 'bubbles'
        }); 
    
        loading.present();
            this.uploadPicture3(blob);
            loading.dismiss()
            
      
          })
      
            .catch((e) => {
      
              this.handleError(e); 
      
            });
      
        }
      
       
      
      uploadPicture3(blob: any): void { 
    
        let loading = this.loadingCtrl.create({
          content: 'Loading image 3, Please wait...', spinner: 'bubbles'
        }); 
    
        loading.present();
    
          this.pictureService.upload(blob).then((uppic3) => {
      
            this.uppictureId3 = uppic3._id;
      
            this.uppic3 = uppic3.url;
    
            if(uppic3)
              {
                this.image3 = "Image 3 loaded succesfully"
                loading.dismiss()
              }
      
          })  
            .catch((e) => {
      
              this.handleError(e);
      
            });
      
      } 
   
 
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Post sent to admin for moderation',
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

      this.cpid = Random.id()      

     MeteorObservable.call('addcitypost',this.profile.pcity,this.profile.plang,this.eForm1.get(['uptitle']).value, this.eForm1.get(['updescr']).value, this.eForm1.get(['upsource']).value,this.eForm1.get(['html']).value, this.eForm1.get(['videoid']).value, this.uppic,this.uppictureId, this.upthumb,this.upthumbId, this.uppic2,this.uppictureId2, this.uppic3,this.uppictureId3, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "userpost", this.cpid ).subscribe({
      
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
      
            message: 'This was stopped',
      
            buttons: ['OK'] 

    });

    alert.present();

  }








}