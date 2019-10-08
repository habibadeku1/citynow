import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { LoadingController, ToastController, NavParams, PopoverController, ModalController, NavController, ViewController, Platform } from 'ionic-angular';

import { CityPost, CityCom, MessageType, } from 'api/models';

import  { CityPosts, CityComs, Users, Pictures } from 'api/collections';

import { MeteorObservable } from 'meteor-rxjs';

import * as moment from 'moment';

import { _ } from 'meteor/underscore';

import { Subscription, Observable, Subscriber } from 'rxjs';

//import { PictureService } from '../../services/picture';


import { Profile, User, Picture } from 'api/models';

//import { ProfileCViewPage } from '../profile/pcview'; 

//import { Network } from '@ionic-native/network';

 


 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'citycoms-page',

  templateUrl: 'citycoms.html'

})

export class CityComsPage implements OnInit {

  connected: Subscription;
  disconnected: Subscription;
  
  loading;

  comcount: number;

  msgsentboxs;

  users;

  userpic;

  usersall;

  eventgrp;

  profile: Profile;

  selectedCity: CityPost;

  joinaddschool: string;

  seladdcity: string;

  typeschool: string;

  seladddept: string;

  classyr: string;

  picture: string;

  needId: string;

  comsDayGroups;

  citycom: string = '';

  citycoms;

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

    public loadingCtrl: LoadingController,private toast: ToastController,// private network: Network,

   private navParams: NavParams,

    private el: ElementRef,

    private popoverCtrl: PopoverController,

 //   private pictureService: PictureService,

    private modalCtrl: ModalController,

    private viewCtrl: ViewController,    

    public navCtrl: NavController, private platform: Platform
    

  ) {



    this.senderId = [Meteor.userId()];
    
    this.senderName = [Meteor.user().username];

    

    this.profile = Meteor.user().profile || { fname: '',phone: '',lname: '' };

    //this.selectedEvent = this.navParams.get('ed');

    this.selectedCity = <CityPost>navParams.get('citypost');


    this.comcount = 0;
     
    

  }



 
  ngOnInit() {

         console.log(this.selectedCity._id)

 
         MeteorObservable.subscribe('citycoms', this.selectedCity._id).subscribe(() => { 
            
                  MeteorObservable.autorun().subscribe(() => {
            
                    this.citycoms = this.findCityCom(this.selectedCity._id);

                   // console.log("this is the new count: ", this.eventcoms.count)
                              
                  }); 
             
                });
          
  }


  findCityCom(cid: string) {
    
        return CityComs.find({
          comId: cid
        })
    
      }

  codismiss(): void
  {
    this.viewCtrl.dismiss();
  }




  sendTextMessage(): void {

    // If message was yet to be typed, abort
 
    if (!this.citycom) {

      return; 

    }

    MeteorObservable.call('addCityCom', MessageType.TEXT,

    this.selectedCity._id, this.senderName, this.profile.fname, this.profile.sname,

      this.citycom

    ).zone().subscribe(() => {

      // Zero the input field

      this.citycom = '';

    });
    

  }

  viewprofile(citycom, localNavCtrl: boolean = false): void {
    const modal = this.modalCtrl.create('ProfileCViewPage', {citycom});
    modal.present();
   } 







}