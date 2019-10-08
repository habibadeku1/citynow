import { ViewChild, Component, OnInit, } from '@angular/core';
import { LoadingController, ToastController, Content, Platform, NavController, PopoverController, IonicPage, ModalController, NavParams, ViewController } from 'ionic-angular';

import { Observable, Subscriber } from 'rxjs';

import { Profile, GroupPost, GroupCom, Group } from 'api/models';
import { MeteorObservable } from 'meteor-rxjs';

import { Pictures, GroupPosts, GroupComs, Groups, Users, Thumbs } from 'api/collections';

import { Storage } from '@ionic/storage';

//import { HausaGroupPostEntry } from '../hausapage3/hausagrouppentry';

//import { HausaGroupComsPage } from '../hausapage3/hausagroupcoms';

//import { HausaGPostPage } from '../hausapage3/hausagpostpage';

//import { HausaPageMenuOptionsComponent3 } from '../hausapage3/hausamenu-options';

//import { ProfileViewPage } from '../profile/pview';






@IonicPage()
@Component({
  selector: 'hausagroupppage',
  templateUrl: 'hausagroupppage.html'
})
export class HausaGroupPostsPage implements OnInit { 

  @ViewChild(Content) content: Content;
 

  profile;

  pcity;
  
  picture;

  fname;

  groupposts;

  admincityposts;

  selectedGroup;

  takegroup;

  checkf;

  rootNavCtrl: NavController;

  grouppostsBatchCounter: number = 0;
  
  

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController,private viewCtrl: ViewController,private platform: Platform, private storage: Storage, public modalCtrl: ModalController, private navCtrl: NavController, private popoverCtrl: PopoverController, public navParams: NavParams)
  
  {

    this.rootNavCtrl = navParams.get('rootNavCtrl');

    this.selectedGroup = <GroupPost>navParams.get('group');

    console.log(this.selectedGroup)




    MeteorObservable.subscribe('group').subscribe(() => { 
      
            MeteorObservable.autorun().subscribe(() => {
      
              this.checkf = Groups.findOne( { followIds: { $in: [ Accounts.user()._id ] }, _id:this.selectedGroup._id })

            });

    }); 


  }


  ngOnInit(): void { 


    let loading1 = this.loadingCtrl.create({
      content: 'Loading...', spinner: 'dots'
    }); 

    loading1.present();
    
        MeteorObservable.subscribe('groupposts', this.selectedGroup._id, ++this.grouppostsBatchCounter).subscribe(() => {
          
                MeteorObservable.autorun().subscribe(() => {
    
                  this.groupposts = this.findGroupPosts(this.selectedGroup._id);

                  if(this.groupposts)
                    {
                      loading1.dismiss()
                    }
    
                });
    
        });
    
      }


  ngAfterViewInit() {

    this.pcity = Meteor.user().profile.pcity
    
    this.content.ionScrollEnd.subscribe(()=>{
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
            
      
            if ( (scrollTop + contentHeight + 20) > scrollHeight) {


                MeteorObservable.subscribe('groupposts', this.selectedGroup._id, ++this.grouppostsBatchCounter).subscribe(() => {
                  
                        MeteorObservable.autorun().subscribe(() => {

                      //    let loading = this.loadingCtrl.create({
                      //      content: 'Loading...', spinner: 'dots'
                      //    }); 
                      
                      //    loading.present();
                  
                          this.groupposts = this.findGroupPosts(this.selectedGroup._id);

                      //    if(this.groupposts)
                      //      {
                      //        loading.dismiss();
                      //      }
                        
                        });
            
                }); 


            } else {
            //  this.shouldScrollDown = false;
            //  this.showScrollButton = true;
            }


    });

    MeteorObservable.call('removeMyBadgeGP', this.selectedGroup._id).subscribe({
      
      next: () => {
    
    },
      error: (e: Error) => {
      //  this.handleError(e);
    }
    });

  }



  

  findGroupPosts(gpid: string) {  
    
          return GroupPosts.find({gpid: gpid, deleted: false, approved: true }, {sort: { upDate: -1 }}).map(groupposts => {
           
            groupposts.forEach(grouppost => {

              this.profile = Users.findOne({_id:grouppost.posterid}).profile ;
              
                                  let platform = this.platform.is('android') ? "android" :
                                  
                                          this.platform.is('ios') ? "ios" : "";
                                  
                                        platform = this.platform.is('cordova') ? platform : "";  
                                  
                                        grouppost.posterpicture = Pictures.getPictureUrl(this.profile.picture, platform);
          
        
                   
                    this.findLastComment(grouppost._id).subscribe((comment) => {
                 
                      grouppost.lastComment = comment;
                      
                              });


            });
      
            return groupposts; 
      
          });
      
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





  grouppostentry(grppost, localNavCtrl: boolean = false): void {

        const modal = this.modalCtrl.create('HausaGroupPostEntry', {grppost: grppost}); 
        modal.present();

   //     if (localNavCtrl) {
   //       this.navCtrl.push(GroupPostEntry, {grppost: grppost});
   //     } else {
   //       this.rootNavCtrl.push(GroupPostEntry, {grppost: grppost});
   //     }
        
      
     }


  showpage(grouppost, localNavCtrl: boolean = false): void { 
      
                  console.log(grouppost)

                  const modal = this.modalCtrl.create('HausaGPostPage', {grouppost});
                  modal.present();
               
  
        //    if (localNavCtrl) {
        //      this.navCtrl.push(PostPage, {citypost}); 
        //    } else {
        //      this.rootNavCtrl.push(PostPage, {citypost});
         //   }
          }
          
  showComments(grouppost, localNavCtrl: boolean = false): void {
            
     const modal = this.modalCtrl.create('HausaGroupComsPage', {grouppost});
     modal.present();
          
    } 

  followgp(gpid: string): void {

    MeteorObservable.call('followgp', gpid).zone().subscribe(() => {
      });

  }

  unfollowgp(gpid: string): void {
    
        MeteorObservable.call('unfollowgp', gpid).zone().subscribe(() => {
          });
          
      }

  
      pushlove(id: string): void { 
        
            MeteorObservable.subscribe('checkgrouppostlove').subscribe(() => { 
              
        
            let checkit =  GroupPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
  
            let check1 =  GroupPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
  
            let check2 =  GroupPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
            
               if((!checkit || checkit.lovecount<1) && (!check1 && !check2) )
                {    
              //    console.log(checkit)
                  
               MeteorObservable.call('pushgrouppostlove', id).zone().subscribe(() => {
                        
               });
              }
              else if(checkit)
                {
                 // console.log(checkit)
                  MeteorObservable.call('unpushgrouppostlove', id).zone().subscribe(() => {
                    
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
                 // console.log(checkit)
                  
               MeteorObservable.call('pushgrouppostgood', id).zone().subscribe(() => {


                let toast = this.toastCtrl.create({
                  message: 'Post liked successfully.',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                        
               });
              }
              else if(checkit)
                {
                 // console.log(checkit)
                  MeteorObservable.call('unpushgrouppostgood', id).zone().subscribe(() => {

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
                
                MeteorObservable.subscribe('checkgrouppostnotgood').subscribe(() => { 
                  
            
                let checkit =  GroupPosts.findOne({ notgoodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
  
                let check1 =  GroupPosts.findOne({ loveusersId: { $in: [ Accounts.user()._id ] }, _id:id })
            
                let check2 =  GroupPosts.findOne({ goodusersId: { $in: [ Accounts.user()._id ] }, _id:id })
                
                   if((!checkit || checkit.notgoodcount<1) && (!check1 && !check2) )
                    {    
                      console.log(checkit)
                      
                   MeteorObservable.call('pushgrouppostnotgood', id).zone().subscribe(() => {

                    let toast = this.toastCtrl.create({
                      message: 'Post disliked successfully.',
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                            
                   });
                  }
                  else if(checkit)
                    {
                      console.log(checkit)
                      MeteorObservable.call('unpushgrouppostnotgood', id).zone().subscribe(() => {

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


    menuOptions(grouppost, localNavCtrl: boolean = false): void { 
      const popover = this.popoverCtrl.create('HausaPageMenuOptionsComponent3', {grouppost}, {
        cssClass: 'options-popover2 chats-options-popover'
      });
  
      popover.present(); 
    }

    viewprofile(citypost, localNavCtrl: boolean = false): void {
      const modal = this.modalCtrl.create('ProfileViewPage', {citypost});
      modal.present();
     } 
 

  


  handleError(e: Error): void {
      
          console.error(e.message);
      
          console.error(e.stack);
      
        }
    


}
