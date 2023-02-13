import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  authJwtToken: string;

  constructor(private afAuth: AngularFireAuth) { 
    afAuth.idToken.pipe(take(1)).subscribe(token => {
      console.log('authTokenService ts ctor token: ', token)
      this.authJwtToken = token;
    });
  }
}
