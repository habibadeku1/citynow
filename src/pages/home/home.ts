import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController,ViewController, Platform, AlertController, NavController, PopoverController, NavParams } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs/src';
//import { MenuOptionsComponent } from './menu-options';

import { Observable, Subscriber, Subscription } from 'rxjs';


//import { Profile } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { Thumbs, Pictures, MyBadges, Groups } from 'api/collections';


import { Storage } from '@ionic/storage';

import { Network } from '@ionic-native/network';

import numabbr from 'numabbr'


import { IonicPage } from 'ionic-angular';

 


@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  connected: Subscription;
  disconnected: Subscription;

  isGuest;
  
  loading;

  groupbadge;
  citybadge;
  cbadge;
  pcity;
   
  profile;
  
  thumb;

  picture;  

  fname;

  rootPage: any; 

  page1: any = 'Page1';
  page2: any = 'Page3';
  page3: any = 'Page2';
  page4: any = 'Page4';
//  page5: any = 'Page5';

  constructor(public loadingCtrl: LoadingController,private toast: ToastController, private network: Network, private viewCtrl: ViewController,    private platform: Platform, private navParams: NavParams,private storage: Storage, public navCtrl: NavController,private superTabsCtrl: SuperTabsController, private popoverCtrl: PopoverController, private alertCtrl: AlertController) {

    
  }

  ngOnInit(): void { 

  //  console.log(Meteor.user()._id==null)
    

  //  MeteorObservable.call('forceaddp', "123" ).subscribe({
      
  //    next: () => {

    //  console.log(Meteor.status())
    //  console.log(Meteor.user()._id)

    this.isGuest = Meteor.user()!=null

    if (this.isGuest)
      {


    let loading1 = this.loadingCtrl.create({
      content: 'Loading', spinner: 'dots'
    }); 

    loading1.present();

    let loading2 = this.loadingCtrl.create({
      content: 'Loading', spinner: 'dots'
    }); 

    loading2.present();

    
         this.profile = Meteor.user().profile || { fname: '' };

         this.pcity = Meteor.user().profile.pcity

         if (this.pcity)
          {
            loading1.dismiss();
            
          }

         const checkgroups = Groups.collection.find({ followIds: { $in: [ Accounts.user()._id ] }}).fetch()

         
         var allgroups=[];
         
         for (var j=0; j<checkgroups.length; j++){
       
           allgroups.push(checkgroups[j]._id);            
       
         }
       
         this.storage.set("profilelcfr", this.profile);  
       
         console.log("profile pic etc")
         console.log(this.storage.get("prlf"));
       
       
         MeteorObservable.subscribe('userfull').subscribe(() => { 
          
                let platform = this.platform.is('android') ? "android" :
          
                  this.platform.is('ios') ? "ios" : "";
          
                platform = this.platform.is('cordova') ? platform : "";  
          
                this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform);

                if (this.picture)
                  {
                    loading2.dismiss();
                    
                  }
          
              }); 
 


         MeteorObservable.subscribe('chatbadge', "chat").subscribe(() => {
                
         MeteorObservable.autorun().subscribe(() => {

                                let carray = MyBadges.find({memberId:Meteor.user()._id, type:"chat"}).fetch()

                                var totalb=0

                                for (var i=0; i<carray.length; i++){
                                  
                                       totalb += carray[i].badgecount 

                                    }

                              if (totalb)
                                {
                                this.cbadge = numabbr(totalb)
          
                            }
                            else
                              {
                                this.cbadge = numabbr(totalb)
                              }

                                    
                            })
                
                  })  


         MeteorObservable.subscribe('cbadge', this.pcity).subscribe(() => {
                    
                                     MeteorObservable.autorun().subscribe(() => {
                    
                                                  let citybg = MyBadges.findOne({ badgerefid: this.pcity, memberId:Meteor.user()._id })
                                      
                                                  if (citybg)
                                                  {
                                                      this.citybadge = numabbr(citybg.badgecount)
                                
                                                  }
                                                  else
                                                  {
                                                      this.citybadge = numabbr(0)
                                                  }
                                        
                                                })
                    
                                    })

         MeteorObservable.subscribe('gbadge', "grouppost").subscribe(() => {
                                      
                    MeteorObservable.autorun().subscribe(() => {
                      
                                                      let garray = MyBadges.find({memberId:Meteor.user()._id, type:"grouppost"}).fetch()
  
                                                      var totalb=0
  
                                                      for (var i=0; i<garray.length; i++){
                                                        
                                                             totalb += garray[i].badgecount 
  
                                                          }
  
                                                    if (totalb)
                                                      {
                                                      this.groupbadge = numabbr(totalb)
                                
                                                  }
                                                  else
                                                    {
                                                      this.groupbadge = numabbr(totalb)
                                                    }
  
                                                          
                                                  })
                                      
                                        }) 
                                        
  //          if(this.profile && this.pcity && this.thumb && this.cbadge && this.citybadge && this.groupbadge)
  //            {
  //              loading.dismiss();
  //            }

                                      }

  
        
  //    },
  //    error: (e: Error) => {
  //      this.handleError(e);
  //    }
  //   });    
   

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
      
      
        loadingdiscon()
        {
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

        

  ngAfterViewInit() {

    //  this.superTabsCtrl.setBadge('page1', 5);

    }
    
    hideToolbar() {
      this.superTabsCtrl.showToolbar(false);
    }
    
    showToolbar() {
      this.superTabsCtrl.showToolbar(true);
    }

    onTabSelect(tab: { index: number; id: string; }) {
      console.log(`Selected tab: `, tab);
    }

    menuOptions(): void {
      const popover = this.popoverCtrl.create('MenuOptionsComponent', {}, {
        cssClass: 'options-popover chats-options-popover'
      });
  
      popover.present();
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
