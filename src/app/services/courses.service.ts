import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';

import {Course} from '../model/course';
import { convertSnapshots } from "./db-utils";


@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private db: AngularFirestore) {

    }
    loadCoursesByCategory(category: string): Observable<Course[]> {
        const courses: Course[] = [];

        return this.db.collection(
            'courses',
            ref => ref.where('categories', 'array-contains', category)
                .orderBy('seqNo')
            )
            .get()
            .pipe(
                map(result => convertSnapshots<Course>(result))
            );
    }
}