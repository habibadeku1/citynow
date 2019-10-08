import { MongoObservable } from 'meteor-rxjs';

import { Group } from '../models';

import { GroupPosts } from './groupposts';

 

export const Groups = new MongoObservable.Collection<Group>('groups');

// Dispose unused messages
