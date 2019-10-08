import { MongoObservable } from 'meteor-rxjs';

import { CityPost } from '../models';

 

export const CityPosts = new MongoObservable.Collection<CityPost>('cityposts');