import { MongoObservable } from 'meteor-rxjs';

import { Profile } from '../models';


 

export const Profiles = new MongoObservable.Collection<Profile>('profiles'); 

