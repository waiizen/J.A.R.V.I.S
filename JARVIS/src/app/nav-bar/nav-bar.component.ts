import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {AuthComponent} from "../auth/auth.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        }
        else this.isAuth = false;
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
    alert('Signed out.');
  }

}
