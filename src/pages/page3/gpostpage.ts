import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, ToastController, NavParams, PopoverController, ModalController, LoadingController, AlertController, ViewController } from 'ionic-angular';

import { GroupPost, MessageType, Profile, GroupCom } from 'api/models';

import { Thumbs, Pictures, GroupPosts, GroupComs, Users } from 'api/collections';

import { PictureService } from '../../services/picture'; 

//import { GroupComsPage } from '../page3/groupcoms';
 
import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscriber } from 'rxjs'; 


import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

import { DomSanitizer } from '@angular/platform-browser';

//'import { ProfileViewPage } from '../profile/pview';
import { ImageViewerController } from 'ionic-img-viewer';




import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
    
      selector: 'gpostpage',
    
      templateUrl: 'gpostpage.html'
    
    })

    
export class GPostPage implements OnInit {
  _imageViewerCtrl: ImageViewerController;
  
    selectedPage: GroupPost;
    selectedPage1: GroupPost;


    profile: Profile;
    
    title;
    updescr;
    upsource;
    html;
    videoid;
    youtube;
    createdAt;
    posterpictureId;    
    posterpicture;
    postername;
    picture; 
    picture2; 
    picture3;
    lovecount;
    goodcount;
    notgoodcount; 
    comcount;
    


    constructor(imageViewerCtrl: ImageViewerController, private platform: Platform, public toastCtrl: ToastController,private navParams: NavParams, 
        
            private pictureService: PictureService,private domSanitizer: DomSanitizer,
        
            private viewCtrl: ViewController , public modalCtrl: ModalController, private inAppBrowser: InAppBrowser
        
          ) 
          {
            this._imageViewerCtrl = imageViewerCtrl; 
            
          }

          presentImage(img1) {
            const imageViewer = this._imageViewerCtrl.create(img1);
            imageViewer.present(); 
          }

          findLastComment(comId: string): Observable<GroupCom> {
            
                  return Observable.create((observer: Subscriber<GroupCom>) => {
            
                  const evExists = () => !!GroupPosts.findOne(comId); 
    
                  // Re-compute until chat is removed                
            
                  MeteorObservable.autorun().zone().takeWhile(evExists).zone().subscribe(() => {
    
                    GroupComs.find({ comId }, {
            
                      sort: { createdAt: -1 }
            
                    }).zone().subscribe({
            
                      next: (comments) => {
    
                              
                        // Invoke subscription with the last message found
            
                        if (!comments.length) {
            
                          return;
            
                        }
            
                        const lastComment = comments[0];
    
       
                        observer.next(lastComment);
            
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

          ngOnInit() {


            this.selectedPage = <GroupPost>this.navParams.get('grouppost');

            console.log(this.selectedPage._id)
            
                        this.title = this.selectedPage.uptitle;
                        
                                    this.updescr = this.selectedPage.updescr;
                        
                                    this.upsource = this.selectedPage.upsource;
                        
                                    this.html = this.selectedPage.html;
                        
                                    this.videoid = this.selectedPage.videoid;
                        
                                    this.youtube = "https://www.youtube.com/embed/"+this.selectedPage.videoid;
                        
                                    this.createdAt = this.selectedPage.createdAt;
                                    
                                    this.picture = this.selectedPage.picture;
                        
                                    this.picture2 = this.selectedPage.picture2;
                        
                                    this.picture3 = this.selectedPage.picture3;

                                    this.profile = Users.findOne({_id:this.selectedPage.posterid}).profile ;                                    
                                    
                                    let platform = this.platform.is('android') ? "android" :
                                    
                                            this.platform.is('ios') ? "ios" : "";
                                    
                                          platform = this.platform.is('cordova') ? platform : "";  
                                    
                                          this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);            
                                    
                                    this.postername = this.selectedPage.postername;
                        
                                    this.comcount = this.selectedPage.comcount;
            
                        this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                          
                                            this.selectedPage.lastComment = comment;
                               
                                       });

          }

    showComments(grouppost, localNavCtrl: boolean = false): void {
            
     const modal = this.modalCtrl.create('GroupComsPage', {grouppost});
     modal.present();
          
    } 

  
  pushlove(id: string): void { 
      
          MeteorObservable.subscribe('checkgrouppostlove').subscribe(() => { 
            
      
          let checkit =  GroupPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check1 =  GroupPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check2 =  GroupPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
             if((!checkit || checkit.lovecount<1) && (!check1 && !check2) )
              {    
                console.log(checkit)
                
             MeteorObservable.call('pushgrouppostlove', id).zone().subscribe({

              next: () => {

                this.selectedPage = GroupPosts.findOne({ _id:id })
                
                            this.title = this.selectedPage.uptitle;
                
                            this.updescr = this.selectedPage.updescr;
                
                            this.upsource = this.selectedPage.upsource;
                
                            this.createdAt = this.selectedPage.createdAt;
                            
                            this.picture = this.selectedPage.picture;
                
                            this.picture2 = this.selectedPage.picture2;
                
                            this.picture3 = this.selectedPage.picture3;
                            
                            let platform = this.platform.is('android') ? "android" :
                            
                                    this.platform.is('ios') ? "ios" : "";
                            
                                  platform = this.platform.is('cordova') ? platform : "";  
                            
                                  this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                  
                            this.postername = this.selectedPage.postername; 
                            
                            this.comcount = this.selectedPage.comcount;

                            this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                              
                                                this.selectedPage.lastComment = comment;
                                   
                                           });
                            

              }
                      
             });
            }
            else if(checkit)
              {
                console.log(checkit)
                MeteorObservable.call('unpushgrouppostlove', id).zone().subscribe({
                  
                  next: () => {

                    this.selectedPage = GroupPosts.findOne({ _id:id })
                    
                                this.title = this.selectedPage.uptitle;
                    
                                this.updescr = this.selectedPage.updescr;
                    
                                this.upsource = this.selectedPage.upsource;
                    
                                this.createdAt = this.selectedPage.createdAt;
                                
                                this.picture = this.selectedPage.picture;
                    
                                this.picture2 = this.selectedPage.picture2;
                    
                                this.picture3 = this.selectedPage.picture3;
                                
                                let platform = this.platform.is('android') ? "android" :
                                
                                        this.platform.is('ios') ? "ios" : "";
                                
                                      platform = this.platform.is('cordova') ? platform : "";  
                                
                                      this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                      
                                this.postername = this.selectedPage.postername;  
                                
                                this.comcount = this.selectedPage.comcount;

                                this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                                  
                                                    this.selectedPage.lastComment = comment;
                                       
                                               });
                                
    
                                  
                                }
              });
            }
           
            })
        }
        
        pushgood(id: string): void { 
          
          MeteorObservable.subscribe('checkgrouppostgood').subscribe(() => { 
            
      
          let checkit =  GroupPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check1 =  GroupPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
          let check2 =  GroupPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
             if((!checkit || checkit.goodcount<1) && (!check1 && !check2))
              {    
                console.log(checkit)
                
             MeteorObservable.call('pushgrouppostgood', id).zone().subscribe({
              
                            next: () => {

                              let toast = this.toastCtrl.create({
                                message: 'Post liked successfully.',
                                duration: 3000,
                                position: 'bottom'
                              });
                              toast.present();
              
                              this.selectedPage = GroupPosts.findOne({ _id:id })
                              
                              this.title = this.selectedPage.uptitle;
                              
                                          this.updescr = this.selectedPage.updescr;
                              
                                          this.upsource = this.selectedPage.upsource;

                                          this.html = this.selectedPage.html;
                                          
                                          this.videoid = this.selectedPage.videoid;

                                          this.youtube = "https://www.youtube.com/embed/"+this.selectedPage.videoid;
                              
                                          this.createdAt = this.selectedPage.createdAt;
                                          
                                          this.picture = this.selectedPage.picture;
                              
                                          this.picture2 = this.selectedPage.picture2;
                              
                                          this.picture3 = this.selectedPage.picture3;
                                          
                                          let platform = this.platform.is('android') ? "android" :
                                          
                                                  this.platform.is('ios') ? "ios" : "";
                                          
                                                platform = this.platform.is('cordova') ? platform : "";  
                                          
                                                this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                                
                                          this.postername = this.selectedPage.postername;  
                                          
                                          this.comcount = this.selectedPage.comcount;

                                          this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                                            
                                                              this.selectedPage.lastComment = comment;
                                                 
                                                         });
                                          
              
                            }
                                    
                           });
            }
            else if(checkit)
              {
                console.log(checkit)
                MeteorObservable.call('unpushgrouppostgood', id).zone().subscribe({
                  
                                next: () => {


                                  let toast = this.toastCtrl.create({
                                    message: 'Post un-liked successfully.',
                                    duration: 3000,
                                    position: 'bottom'
                                  });
                                  toast.present();
                                  
                  
                                  this.selectedPage = GroupPosts.findOne({ _id:id })
                                  
                                  this.title = this.selectedPage.uptitle;
                                  
                                              this.updescr = this.selectedPage.updescr;
                                  
                                              this.upsource = this.selectedPage.upsource;

                                              this.html = this.selectedPage.html;
                                              
                                              this.videoid = this.selectedPage.videoid;

                                              this.youtube = "https://www.youtube.com/embed/"+this.selectedPage.videoid;
                                  
                                              this.createdAt = this.selectedPage.createdAt;
                                              
                                              this.picture = this.selectedPage.picture;
                                  
                                              this.picture2 = this.selectedPage.picture2;
                                  
                                              this.picture3 = this.selectedPage.picture3;
                                              
                                              let platform = this.platform.is('android') ? "android" :
                                              
                                                      this.platform.is('ios') ? "ios" : "";
                                              
                                                    platform = this.platform.is('cordova') ? platform : "";  
                                              
                                                    this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                                    
                                              this.postername = this.selectedPage.postername; 
                                              
                                              this.comcount = this.selectedPage.comcount;

                                              this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                                                
                                                                  this.selectedPage.lastComment = comment;
                                                     
                                                             });
                                              
                  
                                }
                                        
                               });
            }
           
            })
            }

            pushnotgood(id: string): void { 
              
              MeteorObservable.subscribe('checkgrouppostnotgood').subscribe(() => { 
                
          
              let checkit =  GroupPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

              let check1 =  GroupPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
              let check2 =  GroupPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
              
                 if((!checkit || checkit.notgoodcount<1) && (!check1 && !check2) )
                  {    
                    console.log(checkit)
                    
                 MeteorObservable.call('pushgrouppostnotgood', id).zone().subscribe({
                  
                                next: () => {

                                  let toast = this.toastCtrl.create({
                                    message: 'Post disliked successfully.',
                                    duration: 3000,
                                    position: 'bottom'
                                  });
                                  toast.present();
                  
                                  this.selectedPage = GroupPosts.findOne({ _id:id })
                                  
                                  this.title = this.selectedPage.uptitle;
                                  
                                              this.updescr = this.selectedPage.updescr;
                                  
                                              this.upsource = this.selectedPage.upsource;

                                              this.html = this.selectedPage.html;
                                              
                                              this.videoid = this.selectedPage.videoid;

                                              this.youtube = "https://www.youtube.com/embed/"+this.selectedPage.videoid;
                                  
                                              this.createdAt = this.selectedPage.createdAt;
                                              
                                              this.picture = this.selectedPage.picture;
                                  
                                              this.picture2 = this.selectedPage.picture2;
                                  
                                              this.picture3 = this.selectedPage.picture3;
                                              
                                              let platform = this.platform.is('android') ? "android" :
                                              
                                                      this.platform.is('ios') ? "ios" : "";
                                              
                                                    platform = this.platform.is('cordova') ? platform : "";  
                                              
                                                    this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                                    
                                              this.postername = this.selectedPage.postername;  
                                              
                                              this.comcount = this.selectedPage.comcount;

                                              this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                                                
                                                                  this.selectedPage.lastComment = comment;
                                                     
                                                             });
                                              
                  
                                }
                                        
                               });
                }
                else if(checkit)
                  {
                    console.log(checkit)
                    MeteorObservable.call('unpushgrouppostnotgood', id).zone().subscribe({
                      
                                    next: () => {


                                      let toast = this.toastCtrl.create({
                                        message: 'Post un-disliked successfully.',
                                        duration: 3000,
                                        position: 'bottom'
                                      });
                                      toast.present();
                      
                                      this.selectedPage = GroupPosts.findOne({ _id:id })
                                      
                                      this.title = this.selectedPage.uptitle;
                                      
                                                  this.updescr = this.selectedPage.updescr;
                                      
                                                  this.upsource = this.selectedPage.upsource;

                                                  this.html = this.selectedPage.html;
                                                  
                                                  this.videoid = this.selectedPage.videoid;

                                                  this.youtube = "https://www.youtube.com/embed/"+this.selectedPage.videoid;
                                      
                                                  this.createdAt = this.selectedPage.createdAt;
                                                  
                                                  this.picture = this.selectedPage.picture;
                                      
                                                  this.picture2 = this.selectedPage.picture2;
                                      
                                                  this.picture3 = this.selectedPage.picture3;
                                                  
                                                  let platform = this.platform.is('android') ? "android" :
                                                  
                                                          this.platform.is('ios') ? "ios" : "";
                                                  
                                                        platform = this.platform.is('cordova') ? platform : "";  
                                                  
                                                        this.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);                                        
                                                  this.postername = this.selectedPage.postername; 
                                                  
                                                  this.comcount = this.selectedPage.comcount;

                                                  this.findLastComment(this.selectedPage._id).subscribe((comment) => {
                                                    
                                                                      this.selectedPage.lastComment = comment;
                                                         
                                                                 });
                                                  
                      
                                    } 
                                            
                                   });
                }
               
                })
                }

                openWebpage(html: string) {
                  const options: InAppBrowserOptions = {
                    zoom: 'no'
                  }
              
                  // Opening a URL and returning an InAppBrowserObject
                  const browser = this.inAppBrowser.create(html, '_self', options);

                }

                viewprofile(citypost, localNavCtrl: boolean = false): void {
                  const modal = this.modalCtrl.create('ProfileViewPage', {citypost});
                  modal.present();
                 } 
             
     

            



    }