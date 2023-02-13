import * as functions from 'firebase-functions';
import { db } from '../init';
import {firestore} from 'firebase-admin';
import FieldValue = firestore.FieldValue;

export default async(change, context) => {
    if (context.params.courseId == 'stats') {
        return;
    }

    functions.logger.debug('Running update course trigger dude! course id: ',
         context.params.courseId);

    const newData = change.after.data(), oldData = change.before.data();

    let increment = 0;

    if (!oldData.promo && newData.promo) {
        increment = 1;

    } else if (oldData.promo && !newData.promo) {
        increment = -1;
    }
    functions.logger.debug('change before data: ', change.before.data());
    functions.logger.debug('change after data: ', change.after.data());
    functions.logger.debug('context: ', context);
    functions.logger.debug('final increment: ', increment);

    if (increment == 0) {return}

    

    return db.doc('courses/stats').update({totalPromo: FieldValue.increment(increment)});
}
