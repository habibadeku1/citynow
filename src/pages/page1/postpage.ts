import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, ToastController, NavParams, PopoverController, ModalController, LoadingController, AlertController, ViewController } from 'ionic-angular';

import { CityPost, MessageType, Profile, CityCom } from 'api/models';

import { Thumbs, Pictures, CityPosts, CityComs, Users } from 'api/collections';

import { PictureService } from '../../services/picture'; 

//import { CityComsPage } from '../page1/citycoms';

import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscriber } from 'rxjs'; 

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

import { DomSanitizer } from '@angular/platform-browser';

//import { ProfileViewPage } from '../profile/pview';


//import { PageMenuOptionsComponent } from './menu-options';



import { IonicPage } from 'ionic-angular';

import { ImageViewerController } from 'ionic-img-viewer';



 
@IonicPage()
@Component({
    
      selector: 'postpage',
    
      templateUrl: 'postpage.html'
    
    }) 

    
export class PostPage implements OnInit {

    _imageViewerCtrl: ImageViewerController;
  
    selectedPage: CityPost;
    selectedPage1: CityPost;

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

    url;
    


    constructor(imageViewerCtrl: ImageViewerController, public toastCtrl: ToastController,private domSanitizer: DomSanitizer, private inAppBrowser: InAppBrowser, private navParams: NavParams, 
        
            private pictureService: PictureService, private popoverCtrl: PopoverController,
        
            private viewCtrl: ViewController , public modalCtrl: ModalController, private platform: Platform
        
          ) 
          {
            this._imageViewerCtrl = imageViewerCtrl; 
           
          } 

          presentImage(img1) {
            const imageViewer = this._imageViewerCtrl.create(img1);
            imageViewer.present(); 
          }
          

          ngOnInit(): void { 

            this.selectedPage = <CityPost>this.navParams.get('citypost');

            console.log(this.selectedPage._id)
            
             
                        this.title = this.selectedPage.uptitle;
            
                        this.updescr = this.selectedPage.updescr;
            
                        this.upsource = this.selectedPage.upsource;
            
                        this.html = this.selectedPage.html;

                        this.url = "window.open('"+this.html+"', '_system');"
            
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
            

          findLastComment(comId: string): Observable<CityCom> {
            
                  return Observable.create((observer: Subscriber<CityCom>) => {
            
                  const evExists = () => !!CityPosts.findOne(comId); 
    
                  // Re-compute until chat is removed                
            
                  MeteorObservable.autorun().zone().takeWhile(evExists).zone().subscribe(() => {
    
                    CityComs.find({ comId }, {
            
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


    showComments(citypost, localNavCtrl: boolean = false): void {
            
     const modal = this.modalCtrl.create('CityComsPage', {citypost});
     modal.present();
          
    } 

  
  pushlove(id: string): void { 
      
          MeteorObservable.subscribe('checkcitypostlove').subscribe(() => { 
            
      
          let checkit =  CityPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check1 =  CityPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check2 =  CityPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
             if((!checkit || checkit.lovecount<1) && (!check1 && !check2) )
              {    
                console.log(checkit)
                
             MeteorObservable.call('pushcitypostlove', id).zone().subscribe({

              next: () => { 

                this.selectedPage = CityPosts.findOne({ _id:id })
                
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
                            
                                  this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
                MeteorObservable.call('unpushcitypostlove', id).zone().subscribe({
                  
                  next: () => {

                    this.selectedPage = CityPosts.findOne({ _id:id })
                    
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
                                
                                      this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
          
          MeteorObservable.subscribe('checkcitypostgood').subscribe(() => { 
            
      
          let checkit =  CityPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

          let check1 =  CityPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
          let check2 =  CityPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
             if((!checkit || checkit.goodcount<1) && (!check1 && !check2))
              {    
                console.log(checkit)
                
             MeteorObservable.call('pushcitypostgood', id).zone().subscribe({
              
                            next: () => {

                              let toast = this.toastCtrl.create({
                                message: 'Post liked successfully.',
                                duration: 3000,
                                position: 'bottom'
                              });
                              toast.present();
              
                              this.selectedPage = CityPosts.findOne({ _id:id })
                              
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
                                          
                                                this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
                MeteorObservable.call('unpushcitypostgood', id).zone().subscribe({
                  
                                next: () => {

                                  let toast = this.toastCtrl.create({
                                    message: 'Post un-liked successfully.',
                                    duration: 3000,
                                    position: 'bottom'
                                  });
                                  toast.present();
                                  
                  
                                  this.selectedPage = CityPosts.findOne({ _id:id })
                                  
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
                                              
                                                    this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
              
              MeteorObservable.subscribe('checkcitypostnotgood').subscribe(() => { 
                
          
              let checkit =  CityPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })

              let check1 =  CityPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
          
              let check2 =  CityPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
              
                 if((!checkit || checkit.notgoodcount<1) && (!check1 && !check2) )
                  {    
                    console.log(checkit)
                    
                 MeteorObservable.call('pushcitypostnotgood', id).zone().subscribe({
                  
                                next: () => {

                                  let toast = this.toastCtrl.create({
                                    message: 'Post disliked successfully.',
                                    duration: 3000,
                                    position: 'bottom'
                                  });
                                  toast.present();
                  
                                  this.selectedPage = CityPosts.findOne({ _id:id })
                                  
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
                                              
                                                    this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
                    MeteorObservable.call('unpushcitypostnotgood', id).zone().subscribe({
                      
                                    next: () => {

                                      let toast = this.toastCtrl.create({
                                        message: 'Post un-disliked successfully.',
                                        duration: 3000,
                                        position: 'bottom'
                                      });
                                      toast.present();
                      
                                      this.selectedPage = CityPosts.findOne({ _id:id })
                                      
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
                                                  
                                                        this.posterpicture = Thumbs.getThumbUrl(this.selectedPage.posterpictureId, platform); 
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
                    zoom: 'yes'
                  }
              
                  // Opening a URL and returning an InAppBrowserObject
                  const browser = this.inAppBrowser.create(html, '_self', options);

                }

                menuOptions(citypost, localNavCtrl: boolean = false): void { 
                  const popover = this.popoverCtrl.create('PageMenuOptionsComponent', {citypost}, {
                    cssClass: 'options-popover2 chats-options-popover'
                  });
              
                  popover.present(); 
                }
            
            
                viewprofile(citypost, localNavCtrl: boolean = false): void {
                 const modal = this.modalCtrl.create('ProfileViewPage', {citypost});
                 modal.present();
                } 
            
              
            



    }