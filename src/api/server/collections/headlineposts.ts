import { MongoObservable } from 'meteor-rxjs';

import { HeadLinePost } from '../models';

 

export const HeadLinePosts = new MongoObservable.Collection<HeadLinePost>('headlineposts');