import { MongoObservable } from 'meteor-rxjs';

import { SearchCity } from '../models';

 

export const SearchCitys = new MongoObservable.Collection<SearchCity>('searchcitys');