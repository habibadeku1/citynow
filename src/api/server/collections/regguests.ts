import { MongoObservable } from 'meteor-rxjs';

import { RegGuest } from '../models';


 

export const RegGuests = new MongoObservable.Collection<RegGuest>('regguests'); 

