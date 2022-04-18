import {Component, OnInit} from '@angular/core';


import 'firebase/firestore';

import {AngularFirestore} from '@angular/fire/firestore';
import {COURSES, findLessonsForCourse} from './db-data';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    constructor(private db: AngularFirestore) {
    }

    async uploadData() {
        console.log('a uD upload data called');
        const coursesCollection = this.db.collection('courses');
        console.log('a uD coursesCollection: ', coursesCollection);
        const courses = await this.db.collection('courses').get();
        
        for (let course of Object.values(COURSES)) {
            console.log('a uD in for loop');

            const newCourse = this.removeId(course);
            console.log('a uD newCourse: ', newCourse);
            
            const courseRef = await coursesCollection.add(newCourse);
            console.log('a uD courseRef: ', courseRef);
            
            const lessons = await courseRef.collection('lessons');
            console.log('a uD lessons: ', lessons);
            
            const courseLessons = findLessonsForCourse(course['id']);
            console.log(`Uploading course ${course['description']}`);
            
            for (const lesson of courseLessons) {
                const newLesson = this.removeId(lesson);
                delete newLesson.courseId;
                await lessons.add(newLesson);
            }
        }
    }

    removeId(data: any) {
        const newData: any = {...data};
        delete newData.id;
        return newData;
    }

    // ====================== GET ============
    onReadDoc() {
        this.db.doc('/courses/Py6GUM4wcFGtiW6gvbFL').get()
        .subscribe(snap => {
            console.log('id: ', snap.id);
            console.log('data: ', snap.data());
        });
    }

    onReadCollection() {
        this.db.collection(
            'courses',
            ref => ref.where('seqNo', '<=', 20)
                .where('url', '==', 'angular-forms-course')
                .orderBy('seqNo')
        ).get()
        .subscribe(snaps => {
            console.log('--------- course -----------');
            snaps.forEach(snap => {
                console.log('id: ', snap.id);
                const data = snap.data();
                console.log('description: ', data['description']);
                console.log('data: ', snap.data());
            });
            
        });
    }

    onReadCollectionGroup() {
        this.db.collectionGroup(
            'lessons',
            ref => ref.where('seqNo', '==', 1)
        ).get()
        .subscribe(snaps => {
            console.log('--------- lessons -----------');
            snaps.forEach(snap => {
                console.log('id: ', snap.id);
                const data = snap.data();
                console.log('description: ', data['description']);
                console.log('data: ', snap.data());
            });
            
        });
    }

    // ================== CHANGES ====================

    onReadDocRT() {
        this.db.doc('/courses/Py6GUM4wcFGtiW6gvbFL')
        .snapshotChanges()
        .subscribe(snap => {
            console.log('id: ', snap.payload.id);
            console.log('data: ', snap.payload.data());
        });
    }

    onReadDocRTValue() {
        this.db.doc('/courses/Py6GUM4wcFGtiW6gvbFL')
        .valueChanges()
        .subscribe(data => {
            console.log('data: ', data);
        });
    }

    onReadCollectionRT() {
        this.db.collection(
            'courses',
            ref => ref.where('seqNo', '<=', 20)
                .where('url', '==', 'angular-forms-course')
                .orderBy('seqNo')
        ).snapshotChanges()
        .subscribe(snaps => {
            console.log('--------- course -----------');
            snaps.forEach(snap => {
                console.log('id: ', snap.payload.doc.id);
                const data = snap.payload.doc.data();
                console.log('description: ', data['description']);
                console.log('data: ', snap.payload.doc.data());
            });
            
        });
    }

    onReadCollectionGroupRT() {
        this.db.collectionGroup(
            'lessons',
            ref => ref.where('seqNo', '==', 1)
        ).get()
        .subscribe(snaps => {
            console.log('--------- lessons -----------');
            snaps.forEach(snap => {
                console.log('id: ', snap.id);
                const data = snap.data();
                console.log('description: ', data['description']);
                console.log('data: ', snap.data());
            });
            
        });
    }

}
















