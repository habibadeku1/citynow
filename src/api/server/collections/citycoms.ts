import { MongoObservable } from 'meteor-rxjs';

import { CityCom } from '../models';

 

export const CityComs = new MongoObservable.Collection<CityCom>('citycoms');