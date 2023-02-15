import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { UserService } from '../services/user.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]> = this.coursesService.loadCoursesByCategory('BEGINNER');
    advancedCourses$: Observable<Course[]> = this.coursesService.loadCoursesByCategory('ADVANCED');

    constructor(
      private router: Router,
      private coursesService: CoursesService,
      public user: UserService,
      ) {
        this.beginnersCourses$.pipe().subscribe(courses => {
          // console.log('h ctor beginner courses sub: ', courses);
        });

        this.advancedCourses$.pipe().subscribe(courses => {
          // console.log('h ctor advanced courses sub: ', courses);
        });

    }

    ngOnInit() {

    }

    loadCourses() {
      this.beginnersCourses$ = this.coursesService.loadCoursesByCategory('BEGINNER');
      this.advancedCourses$ = this.coursesService.loadCoursesByCategory('ADVANCED');
    }

}
