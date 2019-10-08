import { MongoObservable } from 'meteor-rxjs';

import { MyBadge } from '../models';

 

export const MyBadges = new MongoObservable.Collection<MyBadge>('mybadges');