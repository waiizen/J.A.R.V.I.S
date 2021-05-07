import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAl_FPcOvI5KrPB6CQMhHV7Ilj3heaCK54",
      authDomain: "jarvis-nf.firebaseapp.com",
      databaseURL: "https://jarvis-nf-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "jarvis-nf",
      storageBucket: "jarvis-nf.appspot.com",
      messagingSenderId: "1055873151254",
      appId: "1:1055873151254:web:3131ff4f5ccd50790e6037",
      measurementId: "G-QXBE2JGS0Q"
    };
    firebase.default.initializeApp(firebaseConfig);
  }
}
