import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'create-user',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.css']
})
export class CreateUserComponent {

    form = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        admin: [false]
    });

  constructor(
      private fb: FormBuilder,
      private http: HttpClient) {

  }

    onCreateUser() {

        const user = this.form.value;

        console.log('cU oCU created user: ', user);

        this.http.post(environment.api.createUser, {
          email: user.email,
          password: user.password,
          admin: user.admin,
        }).pipe(
          // tap(res => console.log('cU oCU tap resp: ', res)),
          // tap(err => console.log('cU oCU tap err: ', err)),
          catchError(err => {
            // console.log('cU oCU drat! error dude: ', err);
            // alert('rats! didnt create the user!');
            return throwError(err);
          })

        ).subscribe(() => {
          console.log('cU oCU woo hoo dude! we created a freakin user!');
            // alert('Thats a good user!');
        });
    }

}
