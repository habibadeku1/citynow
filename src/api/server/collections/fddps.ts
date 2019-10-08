import { MongoObservable } from 'meteor-rxjs';

import { FDDP } from '../models';

 

export const FDDPs = new MongoObservable.Collection<FDDP>('fddps');