import { Component, OnInit } from '@angular/core';
import { Alert, LoadingController, ToastController,AlertController, NavParams, Platform, ModalController, NavController, PopoverController, IonicPage } from 'ionic-angular';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { Profile, MyBadge, Message, Chat } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

//import { HausaNewChatComponent } from '../hausachats/hausanew-chat';

//import { MessagesPage } from '../messages/messages';



import { Pictures, Users, Chats, Messages, MyBadges } from 'api/collections';

import { Storage } from '@ionic/storage';

//import { Network } from '@ionic-native/network';

import numabbr from 'numabbr'

//import { LoginPage } from '../login/login';



@IonicPage()

@Component({
  selector: 'hausapage2',
  templateUrl: 'hausapage2.html'
})
export class HausaPage2 implements OnInit {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  isGuest;

  rootNavCtrl: NavController;  

  chats;

  senderId;

  profile;
  
  picture; 

  fname;

  constructor(public loadingCtrl: LoadingController,private toast: ToastController//, private network: Network
    , private alertCtrl: AlertController, private platform: Platform, public navParams: NavParams, private modalCtrl: ModalController,private storage: Storage, public navCtrl: NavController, private popoverCtrl: PopoverController) {


    this.rootNavCtrl = navParams.get('rootNavCtrl');
    
    this.senderId = Meteor.userId();
    

  }

  ngOnInit(): void {

    let loading1 = this.loadingCtrl.create({
      content: 'Loading...', spinner: 'dots'
    }); 

    loading1.present();

    this.isGuest = Meteor.user()!=null  



  
    MeteorObservable.subscribe('chats').subscribe(() => {
      
            MeteorObservable.autorun().subscribe(() => {
      
              this.chats = this.findChats();

              if (this.chats)
                {
                  loading1.dismiss();
                  
                }
      
      
            });
      
          });
    
/**    
              // Notifications
        if (this.platform.is('cordova')) {
          //this.fcm.subscribeToTopic('news');
     
          this.fcm.getToken().then(token => {
            console.log("Registering FCM token on backend");
            MeteorObservable.call('saveFcmToken', token).subscribe({
              next: () => console.log("FCM Token saved"),
              error: err => console.error('Impossible to save FCM token: ', err)
            });
          });
     
          this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
              console.log("Received FCM notification in background");
            } else {
              console.log("Received FCM notification in foreground");
            }
          });
     
          this.fcm.onTokenRefresh().subscribe(token => {
            console.log("Updating FCM token on backend");
            MeteorObservable.call('saveFcmToken', token).subscribe({
              next: () => console.log("FCM Token updated"),
              error: err => console.error('Impossible to update FCM token: ' + err)
            });
          });
        }
        
  **/    
    

    }


    findChats() {
      
          // Find chats and transform them
      
          return Chats.find().map(chats => {
      
            chats.forEach(chat => {
      
              chat.title = '';
      
              chat.picture = ''; 
    
              
      
              const receiverId = chat.memberIds.find(memberId => memberId !== this.senderId);
      
              const receiver = Users.findOne(receiverId);
      
       
      
              if (receiver) {
      
                chat.title = receiver.profile.nname +'~'+receiver.profile.fname + ' '+receiver.profile.sname;
      
                let platform = this.platform.is('android') ? "android" :
      
                  this.platform.is('ios') ? "ios" : "";
      
                platform = this.platform.is('cordova') ? platform : "";
      
                chat.picture = Pictures.getPictureUrl(receiver.profile.pictureId, platform);
    
    
              }
    
              this.findCBadge(chat._id).subscribe((mybad) => {
    
                    chat.mybadge = mybad;

                    chat.mybadge.badgecount = numabbr(mybad.badgecount)
               
              });
      
              // This will make the last message reactive
      
              this.findLastChatMessage(chat._id).subscribe((message) => {
      
                chat.lastMessage = message;
      
              });
      
            });
      
            return chats;
      
          });
      
        }
    
    
        findCBadge(chatid: string): Observable<MyBadge> { 
          
    
          return Observable.create((observer: Subscriber<MyBadge>) => {
            
                  // Re-compute until chat is removed
            
                  MeteorObservable.autorun().subscribe(() => {
            
                    MyBadges.find({ badgerefid: chatid, memberId:Meteor.user()._id }).subscribe({
            
                      next: (mybadges) => {
            
                        // Invoke subscription with the last message found
            
                        if (!mybadges.length) {
            
                          return;
            
                        }
            
                        const myBadge = mybadges[0];
            
                        observer.next(myBadge); 
            
                      },
            
                      error: (e) => {
            
                        observer.error(e);
            
                      },
            
                      complete: () => {
            
                        observer.complete();
            
                      }
            
                    });
            
                  });
            
                }); 
              
              }
            
      
       
      
        findLastChatMessage(chatId: string): Observable<Message> {
      
          return Observable.create((observer: Subscriber<Message>) => {
      
            const chatExists = () => !!Chats.findOne(chatId);
    
            console.log(chatExists)
      
       
      
            // Re-compute until chat is removed
      
            MeteorObservable.autorun().takeWhile(chatExists).subscribe(() => {
      
              Messages.find({ chatId }, {
      
                sort: { createdAt: -1 }
      
              }).subscribe({
      
                next: (messages) => {
      
                  // Invoke subscription with the last message found
      
                  if (!messages.length) {
      
                    return;
      
                  }
      
       
      
                  const lastMessage = messages[0];
      
                  observer.next(lastMessage);
      
                },
      
                error: (e) => {
      
                  observer.error(e);
      
                },
      
                complete: () => {
      
                  observer.complete();
      
                }
      
              });
      
            });
      
          });
      
        }

  
  addChat(): void {
      
          const modal = this.modalCtrl.create('HausaNewChatComponent');
      
          modal.present();
      
     } 


  showMessages(chat, localNavCtrl: boolean = false): void { 
      
            MeteorObservable.call('removeMyBadge', chat._id).subscribe({
      
              next: () => {
      
              MeteorObservable.subscribe('chats').subscribe(() => {
                
                      MeteorObservable.autorun().subscribe(() => {
                
                        this.chats = this.findChats();
                
                      });
                
                    });
                  },
              
                    error: (e: Error) => {
              
                      if (e) {
              
                       // this.handleError(e); 
              
                      }
              
                    }
              
                  });
                  console.log(chat)
      
      
            if (localNavCtrl) {
              this.navCtrl.push('MessagesPage', {chat});
            } else {
              this.rootNavCtrl.push('MessagesPage', {chat});
            }
          } 
        
          removeChat(chat: Chat): void {
        
            MeteorObservable.call('removeChat', chat._id).subscribe({
        
              error: (e: Error) => {
        
                if (e) {
        
                  this.handleError(e);
        
                }
        
              }
        
            });
        
          }
     


  ngAfterViewInit() {

    //  this.superTabsCtrl.setBadge('page1', 5);

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
      
       
      
          const alert = this.alertCtrl.create({
      
            buttons: ['OK'],
      
            message: e.message,
      
            title: 'Oops!'
      
          });
      
       
      
          alert.present();
      
        }


}
