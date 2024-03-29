import * as functions from 'firebase-functions';
import { db } from '../init';
import {firestore} from 'firebase-admin';
import FieldValue = firestore.FieldValue;

export default async (snap, context) => {
    functions.logger.debug('Deleting course dude!.  course id: ', context.params.courseId);

    const course = snap.data();

    if (!course.promo) {
        return;
    }

    db.doc('courses/stats').update({totalPromo: FieldValue.increment(-1)});

}