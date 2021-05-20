import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) this.isAuth = true;
        else this.isAuth = false;
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
    alert('Signed out.');
  }

}
