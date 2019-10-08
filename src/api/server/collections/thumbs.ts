import { MongoObservable } from 'meteor-rxjs';

import { UploadFS } from 'meteor/jalik:ufs';

import { Meteor } from 'meteor/meteor';

import * as sharp from 'sharp';  

import { Thumb, DEFAULT_PICTURE_URL } from '../models';

 

export interface ThumbsCollection<T> extends MongoObservable.Collection<T> {

  getThumbUrl(selector?: Object | string, platform?: string): string;

}

 

export const Thumbs =

  new MongoObservable.Collection<Thumb>('thumbs') as ThumbsCollection<Thumb>;

 

export const ThumbsStore = new UploadFS.store.GridFS({

  collection: Thumbs.collection,

  name: 'thumbs',

  filter: new UploadFS.Filter({

    maxSize: 10084 * 1000,

    contentTypes: ['image/*']

  }),

  permissions: new UploadFS.StorePermissions({

    insert: thumbsPermissions,

    update: thumbsPermissions,

    remove: thumbsPermissions

  }),

  transformWrite(from, to) {

    // Resize picture, then crop it to 1:1 aspect ratio, then compress it to 75% from its original quality

    const transform = sharp().resize(100,100).min().crop().toFormat('jpeg', {quality: 75});

    from.pipe(transform).pipe(to);

  }

});
  
 

// Gets picture's url by a given selector

Thumbs.getThumbUrl = function (selector, platform = "") {

  const prefix = platform === "android" ? "/android_asset/www" :

    platform === "ios" ? "" : "";

 

  const thumb = this.findOne(selector) || {};

  return thumb.url || prefix + DEFAULT_PICTURE_URL;

};

 

function thumbsPermissions(userId: string): boolean {

  return Meteor.isServer || !!userId;

}