import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
    @Input()
    set courses(courses: Course[]) {
        if (courses && courses.length > 0) {
            this.coursesBS.next(courses);
            // console.log('cCL @i courses bs: ', this.coursesBS.value);
        }
    };

    get courses() {
        return this.coursesBS.value;
    }
    coursesBS = new BehaviorSubject<Course[]>([]);

    @Output()
    courseEdited = new EventEmitter();

    @Output()
    courseDeleted = new EventEmitter<Course>();

    constructor(
      private dialog: MatDialog,
      private router: Router,
      private coursesService: CoursesService,
      public user: UserService,
      ) {
    }

    ngOnInit() {}

    editCourse(course:Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = "400px";

        dialogConfig.data = course;

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(val => {
                if (val) {
                    this.courseEdited.emit();
                }
            });

    }

    deleteCourse(course: Course) {
        this.coursesService.deleteCourseAndLessons(course.id)
            .pipe(
                tap(() => {
                    console.log('course deleted: ', course);
                    this.courseDeleted.emit();
                }),
                catchError(err => {
                    console.log('cCL dC course NOT deleted : ', course.description);
                    alert('Error - course not deleted');
                    return throwError(err);
                })
            )
            .subscribe();
    }

}
