import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData$: Observable<firebase.User>;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userData$ = this.loginService.userData;
  }

  async signOut() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

}
