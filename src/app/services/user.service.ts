import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRoles } from '../model/user-roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  roles$: Observable<UserRoles>;

  constructor(private afAuth: AngularFireAuth) { 
    this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = afAuth.authState.pipe(map(user => !user));
    this.pictureUrl$ = afAuth.authState.pipe(map(user => user ? user.photoURL : null));
    this.roles$ = afAuth.idTokenResult.pipe(map(token => {
      // console.log('uS ctor token: ', token);
      return token?.claims as UserRoles ?? {admin:false}})
    );
  }

  logout() {
    this.afAuth.signOut();
  }
}
