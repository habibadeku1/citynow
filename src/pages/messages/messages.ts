import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, Directive } from '@angular/core';

import { ToastController, Content, TextInput, Alert, NavParams, PopoverController, ModalController, LoadingController, AlertController, ViewController } from 'ionic-angular';

import { Chat, Message, MessageType, Profile } from 'api/models';

import { Messages } from 'api/collections';

import { MeteorObservable } from 'meteor-rxjs';

import * as moment from 'moment';

//import { _ } from 'meteor/underscore';
 
import * as _ from 'lodash';    

//import { MessagesOptionsComponent } from './messages-options';

import { Subscription, Observable, Subscriber } from 'rxjs';

//import { MessagesAttachmentsComponent } from './messages-attachments';

import { PictureService } from '../../services/picture';

//import { ShowPictureComponent } from './show-picture';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Network } from '@ionic-native/network'; 



//import { ReactiveCountdown } from 'meteor/flyandi:reactive-countdown';


import { IonicPage } from 'ionic-angular';

import { ImageViewerController } from 'ionic-img-viewer';




@IonicPage()
@Component({

  selector: 'messages-page',

  templateUrl: 'messages.html'

})

export class MessagesPage implements OnInit, OnDestroy {

  _imageViewerCtrl: ImageViewerController;  

  connected: Subscription;
  disconnected: Subscription;
  
  loading;



  toggled: boolean = false;

  crdate;

  msgsqllite;
  

  //db = new SQLite();

  checkonline;


  profile: Profile;

  senderName: string;  
  
  senderfName: string;
  
  senderlName: string;
  

  selectedChat: Chat;

  title: string;

  picture: string;

  thumb;

  messagesDayGroups;

  messagesDayGroupsOff;  

  offlinegroup;

  keepmsgs;

  offgroups;

  message: string = '';

  autoScroller: MutationObserver;

  scrollOffset = 0;

  senderId: string;  
  
  loadingMessages: boolean;

  messagesComputation: Subscription;

  messagesBatchCounter: number = 0;

  localstoragemsgs;

  @ViewChild('myInput') myInput: ElementRef;


  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
 

  constructor(
    imageViewerCtrl: ImageViewerController, private toast: ToastController, private network: Network,
    public element:ElementRef,public loadingCtrl: LoadingController,

    navParams: NavParams,

    private el: ElementRef,

    private popoverCtrl: PopoverController,

    private pictureService: PictureService,

    private modalCtrl: ModalController,

    private alertCtrl: AlertController,

    private viewCtrl: ViewController,private sqlite: SQLite

  ) {


    this._imageViewerCtrl = imageViewerCtrl;


    this.selectedChat = <Chat>navParams.get('chat');

  
    this.checkonline = Meteor.status().connected

    this.title = this.selectedChat.title;

    this.picture = this.selectedChat.picture;

    this.senderId = Meteor.userId();

    this.senderName = Meteor.user().username;
        
  
    this.profile = Meteor.user().profile || { fname: '',phone: '',lname: '' }; 

/**    if(Meteor.status().connected){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      
      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS MeteorUser(id INTEGER PRIMARY KEY AUTOINCREMENT,userid)', {})
     // .then(() => alert('Executed SQL'))
      .catch(e => console.log(e));
      
      //data insert section
 
      db.executeSql('INSERT INTO MeteorUser(userid) VALUES(?)', [Meteor.userId()])
     // .then(() => alert('Executed SQL'))
      .catch(e => console.log(e));

    })
      .catch(e => alert(JSON.stringify(e)));
  } */


  }

  presentImage(img1) {
    const imageViewer = this._imageViewerCtrl.create(img1);
    imageViewer.present(); 
  }

   private get messagesPageContent(): Element {

    return this.el.nativeElement.querySelector('.messages-page-content');

  }

 

  private get messagesList(): Element {

    return this.messagesPageContent.querySelector('.messages');

  }

 

  private get scroller(): Element {

    return this.messagesList.querySelector('.scroll-content');

  }

 
  ngOnInit() {


    this.autoScroller = this.autoScroll();

  //  if(Meteor.status().connected)
  //    {

    this.subscribeMessages();

  //    }
  /**    else if (!Meteor.status().connected)
      {
        let isEven = false;
        
            //var messages;
            
        
            this.sqlite.create({
              name: 'data.db',
              location: 'default'
              })
              .then((db: SQLiteObject) => {
              
                db.executeSql("SELECT * FROM LSfindMessagesDayGroups where chatId = 'sGFpAjQpki2pa47SW' ", []).then((data) => {
    
                db.executeSql("SELECT * FROM MeteorUser", []).then((data2) => {
    
                console.log(data2.rows.item(1).userid)
                  
                  
                this.msgsqllite = [];
    
                this.keepmsgs = [];
    
                var gh = new Array;
                
            
                  if(data.rows.length > 0) {
                      for(var i = 0; i < data.rows.length; i++) 
                      {                  
                         this.msgsqllite.push({_id: data.rows.item(i)._id, chatId: data.rows.item(i).chatId, senderId: data.rows.item(i).senderId, senderName: data.rows.item(i).senderName, profilefName: data.rows.item(i).profilefName, profilesName: data.rows.item(i).profilesName, content: data.rows.item(i).content, createdAt: data.rows.item(i).createdAt, type: data.rows.item(i).type, isread: data.rows.item(i).isread});
                      }
                        
    
            //  return this.msgsqllite.forEach((messages) => {
                          
                    const format = 'D MMMM Y'; 
    
                    gh.push(this.msgsqllite)
    
    
                    //console.log(data)
    
                  //  var messages = []
                    
    
         this.offlinegroup = gh.map((messages) => {
    
         // this.keepmsgs.push(messages)
    
       //   console.log(messages)
    
          messages.forEach((message) => {
              
                                        message.ownership = data2.rows.item(1).userid == message.senderId ? 'mine' : 'other';
                      
                                                    return message;
                                     })
    
                              
                              const groupedMessages = _.groupBy(messages, (message) => {
                                                      
                                                     var crdate = new Date(message.createdAt)
     
                                                    // console.log(crdate)
                                                           
                                                     return moment(crdate).format(format);
                                           
                                                   });
                                 
                                           
                              return Object.keys(groupedMessages).map((timestamp: string) => {
    
                              //  console.log(timestamp)
                              //  console.log(groupedMessages[timestamp])
                                
                                                     return {
                                           
                                                       timestamp: timestamp,
                                          
                                                       messages: groupedMessages[timestamp],
                                           
                                                       today: moment().format(format) === timestamp
                                           
                                                     };
                                           
                                                   });
                                          
                                          }); 


                                         // console.log(this.offlinegroup)

                                          for (var q=0; q<this.offlinegroup.length; q++){
                                            
                                               this.offgroups = this.offlinegroup[q]

                                          //  this.keepmsgs.push(this.offlinegroup[q]) 

                                          }

                                         // console.log(this.offgroups)
                      
                                           //     })
                     
                  }  
    
    
                }, (error) => {
                  console.log("ERROR: " + JSON.stringify(error));
                  });
              }, (error) => {
                  console.log("ERROR: " + JSON.stringify(error));
              });
        
            
              })
              .catch(
                e => alert(JSON.stringify(e))
            
            );        
   
      }

      */
     

    // Get total messages count in database so we can have an indication of when to

    // stop the auto-subscriber
 
    MeteorObservable.call('countMessages').subscribe((messagesCount: number) => {

      Observable

      // Chain every scroll event

        .fromEvent(this.scroller, 'scroll') 

        // Remove the scroll listener once all messages have been fetched

        .takeUntil(this.autoRemoveScrollListener(messagesCount))

        // Filter event handling unless we're at the top of the page

        .filter(() => !this.scroller.scrollTop)

        // Prohibit parallel subscriptions

        .filter(() => !this.loadingMessages)

        // Invoke the messages subscription once all the requirements have been met

        .forEach(() => this.subscribeMessages()); 

    });  

  }

 

  ngOnDestroy() {

    this.autoScroller.disconnect();

  }

    // Removes the scroll listener once all messages from the past were fetched

  autoRemoveScrollListener<T>(messagesCount: number): Observable<T> {

    return Observable.create((observer: Subscriber<T>) => {


      Messages.find().subscribe({

        next: (messages) => {

          // Once all messages have been fetched

          if (messagesCount !== messages.length) {

            return;

          }

          // Signal to stop listening to the scroll event

          observer.next();

          // Finish the observation to prevent unnecessary calculations

          observer.complete();

        },

        error: (e) => {

          observer.error(e); 

        }

      });

    });

  }
 

  // Subscribes to the relevant set of messages

  subscribeMessages(): void {
    
        // A flag which indicates if there's a subscription in process
    
        this.loadingMessages = true;
    
        // A custom offset to be used to re-adjust the scrolling position once
    
        // new dataset is fetched
    
        this.scrollOffset = this.scroller.scrollHeight;
    
        MeteorObservable.subscribe('messages',
    
          this.selectedChat._id,
    
          ++this.messagesBatchCounter
    
        ).subscribe(() => {
    
          // Keep tracking changes in the dataset and re-render the view
    
          if (!this.messagesComputation) {
    
            this.messagesComputation = this.autorunMessages();
    
          } 
    
          // Allow incoming subscription requests
    
          this.loadingMessages = false;
    
        });
   
    
      }

 

  // Detects changes in the messages dataset and re-renders the view

  autorunMessages(): Subscription {

    return MeteorObservable.autorun().subscribe(() => {

      this.messagesDayGroups = this.findMessagesDayGroups();
      })


  }

    showOptions(): void {

    const popover = this.popoverCtrl.create('MessagesOptionsComponent', {

      chat: this.selectedChat 

    }, {

      cssClass: 'options-popover messages-options-popover'

    });

    popover.present();

  }

 

 

  findMessagesDayGroups() {

    let isEven = false;


    return Messages.find({

      chatId: this.selectedChat._id

    }, {

      sort: { createdAt: 1 }

    })

      .map((messages: Message[]) => {

        const format = 'D MMMM Y';

  /**      this.sqlite.create({
          name: 'data.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {
          
          //create table section
          db.executeSql('CREATE TABLE IF NOT EXISTS LSfindMessagesDayGroups(_id PRIMARY KEY,chatId,senderId,senderName,profilefName,profilesName,content,createdAt,type,isread)', {})
         // .then(() => alert('Executed SQL'))
          .catch(//e => console.log(e)
        );
          
          //data insert section
        
      for (let msgsql of messages)
        {  
          db.executeSql('INSERT INTO LSfindMessagesDayGroups(_id,chatId,senderId,senderName,profilefName,profilesName,content,createdAt,type,isread) VALUES(?,?,?,?,?,?,?,?,?,?)', [msgsql._id,msgsql.chatId,msgsql.senderId,msgsql.senderName,msgsql.profilefName,msgsql.profilesName,msgsql.content,msgsql.createdAt,msgsql.type,msgsql.isread])
         // .then(() => alert('Executed SQL'))
          .catch(//e => console.log(e)
        );
        }
          
        
        })
          .catch(
            //e => alert(
            //JSON.stringify(e))
          ); */

      //  console.log(messages)

  
        // Compose missing data that we would like to show in the view

        messages.forEach((message) => {


          message.ownership = this.senderId == message.senderId ? 'mine' : 'other'; 
 

          return message;

        });

 
        // Group by creation day

        const groupedMessages = _.groupBy(messages, (message) => {

        //  console.log(moment(message.createdAt).format(format))
          

          return moment(message.createdAt).format(format);

        });

        // Transform dictionary into an array since Angular's view engine doesn't know how

        // to iterate through it

        return Object.keys(groupedMessages).map((timestamp: string) => {

                                       //         console.log(messages)
                                    // console.log(groupedMessages[timestamp])

          return {

            timestamp: timestamp,

            messages: groupedMessages[timestamp],

            today: moment().format(format) === timestamp

          };

        });

      });


  }

/**  findMsgsOffline()
  {
    let isEven = false;
    
        //var messages;
        
    
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {
          
            db.executeSql("SELECT * FROM LSfindMessagesDayGroups where chatId = 'sGFpAjQpki2pa47SW' ", []).then((data) => {

            db.executeSql("SELECT * FROM MeteorUser", []).then((data2) => {

            console.log(data2.rows.item(1).userid)

         //   this.offlinegroup = [];
            
              
            this.msgsqllite = [];

            this.keepmsgs = [];

            var gh = new Array;
            
        
              if(data.rows.length > 0) {
                  for(var i = 0; i < data.rows.length; i++) 
                  {                  
                     this.msgsqllite.push({_id: data.rows.item(i)._id, chatId: data.rows.item(i).chatId, senderId: data.rows.item(i).senderId, senderName: data.rows.item(i).senderName, profilefName: data.rows.item(i).profilefName, profilesName: data.rows.item(i).profilesName, content: data.rows.item(i).content, createdAt: data.rows.item(i).createdAt, type: data.rows.item(i).type, isread: data.rows.item(i).isread});
                  }
                    

        //  return this.msgsqllite.forEach((messages) => {
                      
                const format = 'D MMMM Y'; 

                gh.push(this.msgsqllite)


                //console.log(data)

              //  var messages = []
                

  //    var offmsg = 
  
  return gh.map((messages) => {

     // this.keepmsgs.push(messages)

        console.log(messages)

      messages.forEach((message) => {
          
                                    message.ownership = data2.rows.item(1).userid == message.senderId ? 'mine' : 'other';
                  
                                                return message;
                                 })

                          
                          const groupedMessages = _.groupBy(messages, (message) => {
                                                  
                                                 var crdate = new Date(message.createdAt)
 
                                                 console.log(crdate)
                                                       
                                                 return moment(crdate).format(format);
                                       
                                               });
                             
                                       
                          return Object.keys(groupedMessages).map((timestamp: string) => {

                            console.log(timestamp)
                            
 
                                                 return {
                                       
                                                   timestamp: timestamp,
                                      
                                                   messages: groupedMessages[timestamp],
                                       
                                                   today: moment().format(format) === timestamp
                                       
                                                 };
                                       
                                               });
                                      
                                      }); 
                  
                                       //     })
                 
              }  


            }, (error) => {
            //  console.log("ERROR: " + JSON.stringify(error));
              });
          }, (error) => {
            //  console.log("ERROR: " + JSON.stringify(error));
          });
    
        
          })
          .catch(//e => alert(JSON.stringify(e))
        
        );
  }   */

 

  autoScroll(): MutationObserver {

    const autoScroller = new MutationObserver(this.scrollDown.bind(this));

 
    autoScroller.observe(this.messagesList, {

      childList: true,

      subtree: true

    });

    return autoScroller;

  }

 

  scrollDown(): void {

    // Don't scroll down if messages subscription is being loaded

    if (this.loadingMessages) {

      return;

    }

 

    // Scroll down and apply specified offset

    this.scroller.scrollTop = this.scroller.scrollHeight - this.scrollOffset;

    // Zero offset for next invocation

    this.scrollOffset = 0;

  }
 

/**  onInputKeypress({ keyCode }: KeyboardEvent): void {

    if (keyCode === 13) {

      this.sendTextMessage();

    }

  }   **/

 

  sendTextMessage(): void {

    // If message was yet to be typed, abort

    if (!this.message) {

      return;

    }

            MeteorObservable.call('addMessage', MessageType.TEXT,
            
                  this.selectedChat._id, this.senderName, this.profile.fname, this.profile.sname,
            
                  this.message 
            
                ).zone().subscribe({
                  
                  next: () => {  

                    const msg = this.message
            
                  // Zero the input field
                  this.message = '';
                          
                  
                  MeteorObservable.call('notifyaddMessage', MessageType.TEXT,
                  
                        this.selectedChat._id, this.senderName, this.profile.fname, this.profile.sname, msg 
                  
                      ).zone().subscribe(() => {  
                  
                      });

                    },
                    error: (e: Error) => {
                      this.handleError(e);
                    }
                   });


  }


  selectUploadPicture(): void { 
    
    this.pictureService.select().then((blob) => {    
          this.uploadPicture(blob);
    
        })
    
          .catch((e) => {
    
            this.handleError(e); 
    
          });
    
      }
    
    
    uploadPicture(blob: any): void { 

      let loading = this.loadingCtrl.create({
        content: 'Loading image, Please wait...', spinner: 'bubbles' }); 
  
      loading.present();
  
      this.pictureService.upload(blob).then((picture) => {

        this.pictureService.upload2(blob).then((thumb) => {
        
  
          MeteorObservable.call('addMessage', MessageType.PICTURE,
          
                  this.selectedChat._id, this.senderName, this.profile.fname, this.profile.sname,
          
                  picture.url, thumb.url
          
                ).zone().subscribe({
                  
                  next: () => {  
            
                    if(thumb)
                      {
                        loading.dismiss()
                      }
                  
                    MeteorObservable.call('notifyaddMessage', MessageType.PICTURE,
                  
                        this.selectedChat._id, this.senderName, this.profile.fname, this.profile.sname,
                  
                        "picture message" 
                  
                      ).zone().subscribe(() => {  
                  
                      });
          
                    },
                    error: (e: Error) => {
                      this.handleError(e);
                    }
                   });
            })

  
      });
    
    }


  delMsg(msgid: string)
  { 

    MeteorObservable.subscribe('checkmsg', msgid).subscribe(() => { 
      

    let checkmsgid = Messages.findOne({_id:msgid,senderId:Meteor.user()._id})

    if(checkmsgid)
    {

    const alert = this.alertCtrl.create({
      title: 'Delete This Message',
      message: 'Are you sure you would like to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {

         
            MeteorObservable.call('delMsg', msgid).subscribe({
              
                    error: (e: Error) => {
              
                      if (e) {
              
                        this.handleError(e);
              
                      }
              
                    }
              
                  }); 
                  
                  
          }
        }
      ]
    });
       alert.present();

  }
    

  })

  }




    showPicture(img) {

    const modal = this.modalCtrl.create('ShowPictureComponent', {

      pictureSrc: img

    });

    modal.present();

  }

  
 handleSelection(event) {
   this.message = this.message + " " + event.char;
 }

  handleError(e: Error): void {
    
        console.error(e);
    
     
    
        const alert = this.alertCtrl.create({
    
          title: 'Please check!',
          
                message: 'This was stopped',
          
                buttons: ['OK']
    
        });
    
     
    
        alert.present();
    
      }

      forcescrollDown(): void {
        
            // Scroll down and apply specified offset
        
            this.scroller.scrollTop = this.scroller.scrollHeight - this.scrollOffset;
        
            // Zero offset for next invocation
        
            this.scrollOffset = 0;
        
          }

      updateScroll() {
        console.log('updating scroll')
        this.forcescrollDown()
      }





}
