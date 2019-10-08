import { Component, OnInit } from '@angular/core';
import { Alert, ModalController, NavParams, NavController, PopoverController, IonicPage, AlertController, Platform, ViewController } from 'ionic-angular';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { Profile } from 'api/models';
import { Group } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { SearchCitys, Groups, CityPosts, Users, Chats, Pictures, GroupPosts } from 'api/collections';

//import { GroupPostsPage } from '../page3/groupppage';

//import { PostPage } from '../page1/postpage'; 

//import { GPostPage } from '../page3/gpostpage'; 

import * as _ from 'lodash';    

import { Storage } from '@ionic/storage';

//import { LoginPage } from '../login/login';





@IonicPage()

@Component({
  selector: 'page5',
  templateUrl: 'page5.html'
})
export class Page5 implements OnInit { 

  searchPattern: BehaviorSubject<any>;

  senderId: string;
  
    usercity;
  
    cityarray;
  
    users;
    
  
  postsSubscription: Subscription; 

  posts;

  pcity;

  profile;
  
  picture;

  fname;

  groups;

  groupposts;

  rootNavCtrl: NavController; 
  
  isGuest;
  

  constructor(private viewCtrl: ViewController ,private alertCtrl: AlertController, private platform: Platform, public modalCtrl: ModalController,
public navParams: NavParams, private storage: Storage, public navCtrl: NavController, private popoverCtrl: PopoverController) {


    this.senderId = Meteor.userId();    

    this.rootNavCtrl = navParams.get('rootNavCtrl');

    this.searchPattern = new BehaviorSubject(undefined);   
      
    
  }



  ngOnInit(): void { 

//    MeteorObservable.call('forceaddp', Meteor.user() ).subscribe({
      
//      next: () => {

  this.isGuest = Meteor.user()!=null
  
      if (this.isGuest)
        {
    
    this.pcity = Meteor.user().profile.pcity

    this.observeSearchBar();

        }
    
       
//    },
//    error: (e: Error) => {
    //  this.handleError(e);
//    }
//  });
 
  } 


  updateSubscription(newValue) {

    this.pcity = Meteor.user().profile.pcity
 
  //  console.log(this.pcity)

      this.searchPattern.next(newValue);

              
  }


   observeSearchBar(): void {

   // console.log(this.pcity)
    
        this.searchPattern.asObservable() 
    
        // Prevents the search bar from being spammed
    
          .debounce(() => Observable.timer(500))
    
          .forEach(() => {
    
            if (this.postsSubscription) {
    
              this.postsSubscription.unsubscribe();
    
            }
            
            this.postsSubscription = this.subscribePosts();
    
          });
    
      }
    

    subscribePosts(): Subscription {   
        
            // Fetch all users matching search pattern

            const subscription = MeteorObservable.subscribe('postsearch', this.searchPattern.getValue());
        
            const autorun = MeteorObservable.autorun(); 
        
            
            return Observable.merge(subscription, autorun).subscribe(() => {
        
              this.posts = this.findPosts(); 

              //console.log(this.posts)
            });
          }
        
          findPosts() {

            return SearchCitys.find({citylang: 'English'},{limit: 20, sort: {alltext: 1} }) 
            .startWith([]);
          }

          
      showpage(id,type, localNavCtrl: boolean = false): void { 

        console.log(id)
        console.log(type)
      
        if(type=="cpost")
          {
            
            MeteorObservable.subscribe('checkcitypost', id).subscribe(() => {
              
            let citypost =  CityPosts.findOne({ cpid:id })
              
            console.log(citypost)

              
            const modal = this.modalCtrl.create('PostPage', {citypost});
            modal.present();
            
            })

          }

         else if(type=="gpost")
            {
              MeteorObservable.subscribe('checkgrouppost', id).subscribe(() => {
                
              let grouppost =  GroupPosts.findOne({gpid:id })
  
              console.log(grouppost)
              
               
            const modal = this.modalCtrl.create('GPostPage', {grouppost});
            modal.present();

            })
            }
  
          }


//New code to remove subscriptions
          ionViewWillLeave(){
          //  this.searchPattern.unsubscribe()
          if(Meteor.user())
            {
            this.postsSubscription.unsubscribe();
            }
          //  this.disconnected.unsubscribe();
          }
  

                    
  loginpage(): void {
    const alert = this.alertCtrl.create({
      title: 'Get a user account',
      message: 'Are you sure you would like to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogout(alert);
            return false;
          }
        }
      ]
    });

    //    this.viewCtrl.dismiss().then(() => {
    alert.present();
    //    });
  } 

  handleLogout(alert: Alert): void {

    this.storage.clear()

    alert.dismiss().then(() => {

      this.rootNavCtrl.push('LoginPage', {}, {
        animate: true
      });
      //  this.navCtrl.setRoot(LoginPage, {}, {
      //    animate: true
      //  });
    })
      .catch((e) => {
        this.handleError(e);
      });

  }

        
        
          handleError(e: Error): void {
        
            console.error(e);
        
         
        
       //     const alert = this.alertCtrl.create({
        
       //       buttons: ['OK'],
        
       //       message: e.message,
        
       //       title: 'Oops!'
        
       //     });
        
         
        
       //     alert.present();
        
          }
        


}
