import 'meteor-client';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { Meteor } from 'meteor/meteor';

import { MeteorObservable } from 'meteor-rxjs';
import { enableProdMode } from '@angular/core';


enableProdMode();



platformBrowserDynamic().bootstrapModule(AppModule);

//Meteor.startup(() => { 

//  console.log("meteor started")

//    const subscription = MeteorObservable.autorun().subscribe(() => {
  

//     if (Meteor.loggingIn()) {
  
//      console.log("i'm here!")
//        return;
  
//      }
 
//      setTimeout(() => subscription.unsubscribe());
    
//   });

 
  
  
//  }); 
