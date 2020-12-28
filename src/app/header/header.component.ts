import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import *  as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  idAuth: boolean;

  constructor(private authServise: AuthService) {
  }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.idAuth = true;
        } else {
          this.idAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authServise.signOutUser();
  }
}
