import { ViewChild, Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { ViewController, Alert, LoadingController, ToastController, Content, AlertController, Platform, NavController, PopoverController, IonicPage, ModalController, NavParams } from 'ionic-angular';

import { Subscription, Observable, Subscriber } from 'rxjs';

import { Profile, CityPost, CityCom } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { Thumbs, Pictures, CityPosts, CityComs, HeadLinePosts, Users, RegGuests } from 'api/collections';

import { Storage } from '@ionic/storage'; 

//import { HausaCityPostPage } from '../hausapage1/hausacityppage';

//import { HausaCityComsPage } from '../hausapage1/hausacitycoms';

//import { HausaPostPage } from '../hausapage1/hausapostpage';

//import { ProfileViewPage } from '../profile/pview';

import { FCM } from "@ionic-native/fcm";

//import { HausaPageMenuOptionsComponent } from './hausapagemenu-options';

import { DomSanitizer } from '@angular/platform-browser';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FormControl, FormBuilder, FormGroup } from "@angular/forms";

//import { Network } from '@ionic-native/network';

import { Device } from '@ionic-native/device';

//import { LoginPage } from '../login/login';








@IonicPage()
@Component({
  selector: 'hausapage1',
  templateUrl: 'hausapage1.html'
})
export class HausaPage1 implements OnInit {

  connected: Subscription;
  disconnected: Subscription;

  loading;

  @ViewChild(Content) content: Content;

  statusText: string = "not reached";


  newBottom;

  profile: Profile;

  picture;

  thumb;

  fname;

  pcity;

  plang;

  cityposts;

  admincityposts;

  rootNavCtrl: NavController;

  html;

  user;

  isGuest;


  //  autoScroller: MutationObserver;
  //  scrollOffset = 0;
  //  citypostsComputation: Subscription;
  //  loadingCityposts: boolean;

  citypostsBatchCounter: number = 0;


  constructor(private viewCtrl: ViewController, private device: Device, private toast: ToastController,// private network: Network,
     public loadingCtrl: LoadingController, lc: NgZone, private formBuilder: FormBuilder, private el: ElementRef, public toastCtrl: ToastController, private iab: InAppBrowser, protected sanitizer: DomSanitizer, private fcm: FCM, private alertCtrl: AlertController, private platform: Platform, private storage: Storage, public modalCtrl: ModalController, private navCtrl: NavController, private popoverCtrl: PopoverController, public navParams: NavParams, ) {


    this.rootNavCtrl = navParams.get('rootNavCtrl');

    //  this.html = sanitizer.bypassSecurityTrustHtml('<a href="http://www.alumates.com/legal/terms-and-conditions.html" >http://www.alumates.com/legal/terms-and-conditions.html</a>');

    this.user = Meteor.user()

    console.log(this.user)

  }



  ngOnInit(): void {



  //  MeteorObservable.call('forceaddp', "123").subscribe({

  //    next: () => {

        this.isGuest = Meteor.user() != null


        //  this.autoScroller = this.autoScroll();
        //    this.subscribeCityposts();

        let loading1 = this.loadingCtrl.create({
          content: 'Loading', spinner: 'dots'
        });

        loading1.present();

        let loading2 = this.loadingCtrl.create({
          content: 'Loading', spinner: 'dots'
        });

        loading2.present();



        if (this.isGuest) {
          // Notifications
          if (this.platform.is('cordova')) {

            this.fcm.getToken().then(token => {
              console.log("Registering FCM token on backend");
              MeteorObservable.call('saveFcmToken', token).subscribe({
                next: () => console.log("FCM Token saved"),
                error: err => console.error('Impossible to save FCM token: ', err)
              });
            });

            this.fcm.onNotification().subscribe(data => {
              if (data) {
                console.log("Received FCM notification in background");
                //  this.vibration.vibrate(1000);

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



          this.pcity = Meteor.user().profile.pcity

          this.plang = Meteor.user().profile.plang


          console.log(this.pcity)

          MeteorObservable.subscribe('userfull').subscribe(() => {
            
                        MeteorObservable.autorun().subscribe(() => {
            
                          this.profile = Meteor.user().profile || { fname: '', sname: '' };
            
                          this.fname = Meteor.user().profile.fname
            
            
            
                          let platform = this.platform.is('android') ? "android" :
            
                            this.platform.is('ios') ? "ios" : "";
            
                          platform = this.platform.is('cordova') ? platform : "";
            
                          this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform);
            
                          if (this.fname && this.picture) {
                            loading1.dismiss();
            
                          }
            
            
                        })
                      });

          MeteorObservable.subscribe('cityposts', ++this.citypostsBatchCounter).subscribe(() => {

            MeteorObservable.autorun().subscribe(() => {

              this.cityposts = this.findCityPosts();

              if (this.cityposts) {
                loading2.dismiss();

              }

            });

          });

        }

        else if (!this.isGuest) {

          MeteorObservable.subscribe('cityposts', ++this.citypostsBatchCounter).subscribe(() => {

            MeteorObservable.autorun().subscribe(() => {

              this.cityposts = this.findCityPostsG();

              if (this.cityposts) {
                loading1.dismiss();
                loading2.dismiss();

              }

            });

          });

        }


  //    },
  //    error: (e: Error) => {
  //      this.handleError(e);
  //    }
  //  });



  }


  ngAfterViewInit() {


    MeteorObservable.call('forceaddp', "123").subscribe({

      next: () => {

        if (this.isGuest) {

          this.pcity = Meteor.user().profile.pcity

          this.plang = Meteor.user().profile.plang

          console.log(this.pcity)

          //    this.scroller

          this.content.ionScrollEnd.subscribe(() => {
            //... do things
            //     console.log("we scrolled")

            //     console.log(this.citypostsBatchCounter, "batchcounter")


            let dimensions = this.content.getContentDimensions();

            let scrollTop = this.content.scrollTop;
            //          console.log(scrollTop, "top")

            let contentHeight = dimensions.contentHeight;

            let scrollHeight = dimensions.scrollHeight;
            //          console.log(scrollHeight, "scrollheight")

            //          console.log(scrollTop + contentHeight, "st+ch")


            if ((scrollTop + contentHeight + 20) > scrollHeight) {

              MeteorObservable.subscribe('cityposts', ++this.citypostsBatchCounter).subscribe(() => {

                MeteorObservable.autorun().subscribe(() => {

                  //      let loading = this.loadingCtrl.create({
                  //        content: 'Loading...', spinner: 'dots'
                  //      }); 

                  //      loading.present();

                  this.cityposts = this.findCityPosts();

                  //      if(this.cityposts)
                  //        {
                  //          loading.dismiss();
                  //        }

                });

              });

            } else {
              //  this.shouldScrollDown = false;
              //  this.showScrollButton = true;
            }

            MeteorObservable.call('removeMyBadgeCP', this.pcity).subscribe({

              next: () => {

              },
              error: (e: Error) => {
                //  this.handleError(e);
              }
            });

          });
        }

        else if (!this.isGuest) {


          //    this.scroller

          this.content.ionScrollEnd.subscribe(() => {
            //... do things
            //     console.log("we scrolled")

            //     console.log(this.citypostsBatchCounter, "batchcounter")


            let dimensions = this.content.getContentDimensions();

            let scrollTop = this.content.scrollTop;
            //          console.log(scrollTop, "top")

            let contentHeight = dimensions.contentHeight;

            let scrollHeight = dimensions.scrollHeight;
            //          console.log(scrollHeight, "scrollheight")

            //          console.log(scrollTop + contentHeight, "st+ch")


            if ((scrollTop + contentHeight + 20) > scrollHeight) {

              MeteorObservable.subscribe('cityposts', ++this.citypostsBatchCounter).subscribe(() => {

                MeteorObservable.autorun().subscribe(() => {

                  //      let loading = this.loadingCtrl.create({
                  //        content: 'Loading...', spinner: 'dots'
                  //      }); 

                  //      loading.present();

                  this.cityposts = this.findCityPostsG();

                  //      if(this.cityposts)
                  //        {
                  //          loading.dismiss();
                  //        }

                });

              });

            } else {
              //  this.shouldScrollDown = false;
              //  this.showScrollButton = true;
            }


          });


        }





      },
      error: (e: Error) => {
        this.handleError(e);
      }
    });

  }



  findCityPosts() {

    return CityPosts.find({ cityname: this.pcity, citylang: this.plang, deleted: false, approved: true }, { sort: { upDate: -1 } }).map(cityposts => {

      cityposts.forEach(citypost => {

        this.profile = Users.findOne({ _id: citypost.posterid }).profile;

        let platform = this.platform.is('android') ? "android" :

          this.platform.is('ios') ? "ios" : "";

        platform = this.platform.is('cordova') ? platform : "";

        citypost.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);




        this.admincityposts = this.findAdminCityPosts()



        this.findLastComment(citypost._id).subscribe((comment) => {

          citypost.lastComment = comment;

        });

      });

      return cityposts;

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

  findAdminCityPosts() {
    return HeadLinePosts.find({});

  }




  findCityPostsG() {


        let dcity = RegGuests.findOne({ did: this.device.uuid })

        
        return CityPosts.find({ cityname: dcity.pcity, citylang: dcity.plang, deleted: false, approved: true }, { sort: { upDate: -1 } }).map(cityposts => {

          cityposts.forEach(citypost => {

            this.profile = Users.findOne({ _id: citypost.posterid }).profile;

            let platform = this.platform.is('android') ? "android" :

              this.platform.is('ios') ? "ios" : "";

            platform = this.platform.is('cordova') ? platform : "";

            citypost.posterpicture = Thumbs.getThumbUrl(this.profile.thumbId, platform);

            this.admincityposts = this.findAdminCityPostsG()

            this.findLastCommentG(citypost._id).subscribe((comment) => {

              citypost.lastComment = comment;

            });

          });

          return cityposts;

        });


  }


  findLastCommentG(comId: string): Observable<CityCom> {

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

  findAdminCityPostsG() {
    return HeadLinePosts.find({});

  }


  citypost(): void {

    const modal = this.modalCtrl.create('HausaCityPostPage');
    modal.present();

  }


  showpage(citypost, localNavCtrl: boolean = false): void {

    console.log(citypost)

    if (localNavCtrl) {
      this.navCtrl.push('HausaPostPage', { citypost });
    } else {
      this.rootNavCtrl.push('HausaPostPage', { citypost });
    }
  }

  showComments(citypost, localNavCtrl: boolean = false): void {

    const modal = this.modalCtrl.create('HausaCityComsPage', { citypost });
    modal.present();

  }


  pushlove(id: string): void {

    MeteorObservable.subscribe('checkcitypostlove').subscribe(() => {


      let checkit = CityPosts.findOne({ loveusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check1 = CityPosts.findOne({ goodusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check2 = CityPosts.findOne({ notgoodusersId: { $in: [Accounts.user()._id] }, _id: id })

      if ((!checkit || checkit.lovecount < 1) && (!check1 && !check2)) {
        //    console.log(checkit)

        MeteorObservable.call('pushcitypostlove', id).zone().subscribe(() => {

        });
      }
      else if (checkit) {
        // console.log(checkit)
        MeteorObservable.call('unpushcitypostlove', id).zone().subscribe(() => {

        });
      }

    })
  }

  pushgood(id: string): void {

    MeteorObservable.subscribe('checkcitypostgood').subscribe(() => {


      let checkit = CityPosts.findOne({ goodusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check1 = CityPosts.findOne({ loveusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check2 = CityPosts.findOne({ notgoodusersId: { $in: [Accounts.user()._id] }, _id: id })

      if ((!checkit || checkit.goodcount < 1) && (!check1 && !check2)) {
        // console.log(checkit)

        MeteorObservable.call('pushcitypostgood', id).zone().subscribe(() => {

          let toast = this.toastCtrl.create({
            message: 'Post liked successfully.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        });
      }
      else if (checkit) {
        // console.log(checkit)
        MeteorObservable.call('unpushcitypostgood', id).zone().subscribe(() => {

          let toast = this.toastCtrl.create({
            message: 'Post un-liked successfully.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        });
      }

    })
  }

  pushnotgood(id: string): void {

    MeteorObservable.subscribe('checkcitypostnotgood').subscribe(() => {


      let checkit = CityPosts.findOne({ notgoodusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check1 = CityPosts.findOne({ loveusersId: { $in: [Accounts.user()._id] }, _id: id })

      let check2 = CityPosts.findOne({ goodusersId: { $in: [Accounts.user()._id] }, _id: id })

      if ((!checkit || checkit.notgoodcount < 1) && (!check1 && !check2)) {
        console.log(checkit)

        MeteorObservable.call('pushcitypostnotgood', id).zone().subscribe(() => {


          let toast = this.toastCtrl.create({
            message: 'Post disliked successfully.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        });
      }
      else if (checkit) {
        console.log(checkit)
        MeteorObservable.call('unpushcitypostnotgood', id).zone().subscribe(() => {


          let toast = this.toastCtrl.create({
            message: 'Post un-disliked successfully.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        });
      }

    })
  }

  search(localNavCtrl: boolean = false): void {
    
      //  console.log(citypost)
    
        if (localNavCtrl) {
          this.navCtrl.push('HausaPage5');
        } else {
          this.rootNavCtrl.push('HausaPage5');
        }
      }


  menuOptions(citypost, localNavCtrl: boolean = false): void {
    const popover = this.popoverCtrl.create('HausaPageMenuOptionsComponent', { citypost }, {
      cssClass: 'options-popover2 chats-options-popover'
    });

    popover.present();
  }


  viewprofile(citypost, localNavCtrl: boolean = false): void {
    const modal = this.modalCtrl.create('ProfileViewPage', { citypost });
    modal.present();
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

    console.error(e.message);

    console.error(e.stack);

  }




}
