import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { NavParams, PopoverController, ModalController, NavController, ViewController, Platform } from 'ionic-angular';

import { GroupPost, GroupCom, MessageType, } from 'api/models';

import  { GroupPosts, GroupComs, Users, Pictures } from 'api/collections';

import { MeteorObservable } from 'meteor-rxjs';

import * as moment from 'moment';

import { _ } from 'meteor/underscore';

import { Subscription, Observable, Subscriber } from 'rxjs';

//import { PictureService } from '../../services/picture';

import { Profile, User, Picture } from 'api/models';

import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'hausagroupcoms-page',

  templateUrl: 'hausagroupcoms.html'

})

export class HausaGroupComsPage implements OnInit {

  comcount: number;

  msgsentboxs;

  users;

  userpic;

  usersall;

  eventgrp;

  profile: Profile;

  selectedGroup: GroupPost;

  joinaddschool: string;

  seladdcity: string;

  typeschool: string;

  seladddept: string;

  classyr: string;

  picture: string;

  needId: string;

  comsDayGroups;

  groupcom: string = '';

  groupcoms;

  autoScroller: MutationObserver;

  scrollOffset = 0;

  senderId: string[];

  senderName: string[];  

  senderfName: string[];

  senderlName: string[];
    
  loadingComs: boolean;

  comsComputation: Subscription;

  comsBatchCounter: number = 0;

 
  rootNavCtrl: NavController;

  constructor(

   private navParams: NavParams,

    private el: ElementRef,

    private popoverCtrl: PopoverController,

  //  private pictureService: PictureService,

    private modalCtrl: ModalController,

    private viewCtrl: ViewController,    

    public navCtrl: NavController, private platform: Platform
    

  ) {



    this.senderId = [Meteor.userId()];
    
    this.senderName = [Meteor.user().username];

    

    this.profile = Meteor.user().profile || { fname: '',phone: '',lname: '' };

    //this.selectedEvent = this.navParams.get('ed');

    this.selectedGroup = <GroupPost>navParams.get('grouppost');

    this.comcount = 0;
    
    

  }



 
  ngOnInit() {

         console.log(this.selectedGroup._id)

 
         MeteorObservable.subscribe('groupcoms', this.selectedGroup._id).subscribe(() => {
            
                  MeteorObservable.autorun().subscribe(() => {
            
                    this.groupcoms = this.findGroupCom(this.selectedGroup._id);

                   // console.log("this is the new count: ", this.eventcoms.count)
                              
                  }); 
             
                });
          
  }


  findGroupCom(cid: string) {
    
        return GroupComs.find({
          comId: cid
        })
    
      }

  codismiss(): void
  {
    this.viewCtrl.dismiss();
  }


  onInputKeypress({ keyCode }: KeyboardEvent): void {

    if (keyCode === 13) {

      this.sendTextMessage();

    }
 
  }


  sendTextMessage(): void {

    // If message was yet to be typed, abort
 
    if (!this.groupcom) {

      return; 

    }

    MeteorObservable.call('addGroupCom', MessageType.TEXT,

    this.selectedGroup._id, this.senderName, this.profile.fname, this.profile.sname,

      this.groupcom

    ).zone().subscribe(() => {

      // Zero the input field

      this.groupcom = '';

    });

  }



}