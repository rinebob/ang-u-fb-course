import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {from, Observable, throwError} from 'rxjs';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import { CoursesService } from '../services/courses.service';
import {Course} from '../model/course';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseId: string;

  form = this.fb.group({
    description: ['', Validators.required],
    url: ['', Validators.required],
    category: [[], Validators.required],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: [null],
  });

  constructor(private fb: FormBuilder,
    private coursesService: CoursesService,
    private afs: AngularFirestore,
    private router: Router) {

  }

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  handleCreateCourse() {
    const val = this.form.value;

    const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category],

    }



    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);
    console.log('cC hCC new course: ', newCourse);

    this.coursesService.createCourse(newCourse, this.courseId)
      .pipe(
        tap(course => {
          console.log('cC hCC created course: ', course);
          this.router.navigateByUrl('/courses');

        }),
        catchError(error => {
          console.log('cC hCC error: ', error);
          return throwError(error);
        })
      ).subscribe();


  }

}
