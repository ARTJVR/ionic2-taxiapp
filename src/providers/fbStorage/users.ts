import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class UsersStorage {
  users: FirebaseListObservable<any[]>;
  userInfo: object;
  userKey: string;

  constructor(db: AngularFireDatabase) {
    this.users = db.list('/users',{ preserveSnapshot: true });
    this.getUserInfo();
    console.log('Users FbStorage Provider');
  }

  addToList(item: any): firebase.Promise<any> {
    return this.users.push(item);
  }

  removeItemFromList(key: string): firebase.Promise<any> {
    return this.users.remove(key);
  }

  deleteEntireList(): firebase.Promise<any> {
    return this.users.remove();
  }

  updateItemInList(key: string,data: any): firebase.Promise<any> {
    return this.users.update(key,data);
  }

  getValue(email: string) {
    this.users.subscribe(snapshots => {
      snapshots.forEach((snapshot) => {
        this.userKey = snapshot.key;
        if (snapshot.val().email === email) {
          this.userInfo = snapshot.val();
        }
      });
    });
  }

  getUserInfo() {
    return this.userInfo;
  }

  getUserKey() {
    return this.userKey;
  }

}
