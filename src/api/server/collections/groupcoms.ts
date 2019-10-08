import { MongoObservable } from 'meteor-rxjs';

import { GroupCom } from '../models';

 

export const GroupComs = new MongoObservable.Collection<GroupCom>('groupcoms');