import { Injectable } from '@angular/core';

//import { Platform } from 'ionic-angular';

//import { Accounts } from 'meteor/accounts-base';

//import { MeteorObservable } from 'meteor-rxjs';

import { Meteor } from 'meteor/meteor';

import { twoFactor } from 'meteor/dburles:two-factor';


 

@Injectable()

export class LoginLogoutService {

  constructor() {
  }

  //loginPasswordlessAskUsername = true;
  

 
  verify(user: string, password: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {

         twoFactor.getAuthCode(user, password, error => {
         if (error) {
            return reject(error);
         }
            resolve();
         });

    });
  }



  login(code: string, user: string): Promise<void> {

    return new Promise<void>((resolve, reject) => {

         twoFactor.verifyAndLogin(code, error => {
         if (error) {
            return reject(error);
         }

            resolve();
         });

    });

  } 
 

  logout(): Promise<void> {

    return new Promise<void>((resolve, reject) => {

      Meteor.logout((e: Error) => {

        if (e) {

          return reject(e);

        }

          resolve();

      });

    });

  }


}