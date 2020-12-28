import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBj6l2kY2rqOKj1BQYltHIXir0XexhRFQ0',
      authDomain: 'totorialfirebase.firebaseapp.com',
      databaseURL: 'https://totorialfirebase.firebaseio.com',
      projectId: 'totorialfirebase',
      storageBucket: 'totorialfirebase.appspot.com',
      messagingSenderId: '249237205885',
      appId: '1:249237205885:web:029124da4fe64f91aa9214'
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
  }
}
