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

  percentageChanges$: Observable<number>;

  form = this.fb.group({
    description: ['', Validators.required],
    // url: ['', Validators.required],
    url: [''],
    category: [[], Validators.required],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: [null],
    iconUrl: [''],
    seqNo: [''],
  });

  iconUrl = '';

  constructor(private fb: FormBuilder,
    private coursesService: CoursesService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) {

  }

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  uploadThumbnail(event) {
    const file:File = event.target.files[0];
    console.log('cC uT file name: ', file.name);

    const filePath = `courses/${this.courseId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: 'max-age=2592000, public'
    });

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges().pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => {
        console.log('cC uT icon url: ', url);
        this.iconUrl = url;
      }),
      catchError(err => {
        console.log('cC uT error: ', err);
        alert('couldnt create the thumbnail url dude!  wtf???');
        return throwError(err);
      })

    ).subscribe();
  }

  handleCreateCourse() {
    const val = this.form.value;

    const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category],
      iconUrl: this.iconUrl,
      seqNo: Number(val.seqNo),

    }

    if (this.form.value.promoStartAt) {
      newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

    }
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
