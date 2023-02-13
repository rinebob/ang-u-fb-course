import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) { 
    this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = afAuth.authState.pipe(map(user => !user));
    this.pictureUrl$ = afAuth.authState.pipe(map(user => user ? user.photoURL : null));
  }

  logout() {
    this.afAuth.signOut();
  }
}
