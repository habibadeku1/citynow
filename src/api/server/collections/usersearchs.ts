import { MongoObservable } from 'meteor-rxjs';

import { UserSearch } from '../models';

 

export const UserSearchs = new MongoObservable.Collection<UserSearch>('usersearchs');