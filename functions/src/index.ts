import * as functions from "firebase-functions";
import { createUserApp } from "./create-user";
// import { db } from "./init";

export const createUser = functions.https.onRequest(createUserApp);

export const onAddCourseUpdatePromoCounter = 
            functions
                .runWith({
                    timeoutSeconds: 300,
                    memory: "1GB",
                })
            .firestore
                .document("/courses/{courseId}")
                .onCreate( async (snap, context) => {

                    // initial method - lesson 50 add doc trigger impl

                    // const course = snap.data();

                    // if (course.promo) {
                    //     return db.runTransaction(async transaction => {
                    //         const counterRef = db.doc('courses/stats');
                    //         const snap = await transaction.get(counterRef);
                    //         const stats = snap.data() ?? {totalPromo: 0};
                    //         stats.totalPromo += 1;
                    //         transaction.set(counterRef, stats);
                    //     });
                    // }


                    // refactored to minimize cold startup time in lesson 51
                    // how to minimize cold startup time of fb cfs
                    await(
                        await import('./promotions-counter/on-add-course')
                    ).default(snap, context);
                });

export const onUpdateCourseUpdatePromoCounter = 
            functions.firestore
                .document('courses/{courseId}')
                .onUpdate(async (change, context) => {
                    await(
                        await import('./promotions-counter/on-update-course')
                    ).default(change, context)

                });

export const onDeleteCourseUpdatePromoCounter = 
                functions.firestore
                .document('courses/{courseId}')
                .onDelete(async (snap, context) => {
                    await(
                        await import('./promotions-counter/on-delete-course')
                    ).default(snap, context)

                });


