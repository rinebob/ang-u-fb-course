import {Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { AuthTokenService } from './services/auth-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public user: UserService,
              private token: AuthTokenService,
              private router: Router
    ) {}
  
  ngOnInit() {
    // this.user.isLoggedIn$.pipe().subscribe(status => console.log('a ctor logged in sub: ', status));
    // this.user.isLoggedOut$.pipe().subscribe(status => console.log('a ctor logged out sub: ', status));
  }

  logout() {
    this.user.logout();
    this.router.navigateByUrl('/login')
  }

}
