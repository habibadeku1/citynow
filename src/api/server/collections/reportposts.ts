import { MongoObservable } from 'meteor-rxjs';

import { ReportPost } from '../models';

 

export const ReportPosts = new MongoObservable.Collection<ReportPost>('reportposts');