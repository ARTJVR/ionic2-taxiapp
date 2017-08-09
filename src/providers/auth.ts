import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  userEmail: string;
  isUserLoginEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public afAuth: AngularFireAuth) { }

  signupUser(Email: string, Password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(Email, Password);
  }

  loginUser(Email: string, Password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(Email, Password);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    this.isUserLoggedIn();
    return this.afAuth.auth.signOut();
  }

  getUserEmail() {
    return this.userEmail;
  }

  isUserLoggedIn() {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in.");
          this.isUserLoginEvent.emit(false);
        } else {
          console.log("Successfully Logged in.");
          this.userEmail = auth.email;
          this.isUserLoginEvent.emit(true);
        }
      }
    );

    return this.isUserLoginEvent;
  }

}