import { MongoObservable } from 'meteor-rxjs';

import { GroupPost } from '../models';



 

export const GroupPosts = new MongoObservable.Collection<GroupPost>('groupposts');



