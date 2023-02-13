import * as functions from 'firebase-functions';
import { firestore } from "firebase-admin";
import {db} from '../init';
import FieldValue = firestore.FieldValue;

export default async (snap, context) => {

    functions.logger.debug('Running add course trigger dude!  id: ', context.params.courseId);
    const course = snap.data();

    if (course.promo) {
        functions.logger.debug('handling a promo course: ', course);

        // note - this fails if the stats doc isn't present in the courses colln
        return db.doc('courses/stats').update({
            totalPromo: FieldValue.increment(1)
        });
    }

}