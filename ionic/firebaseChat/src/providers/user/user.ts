import { Injectable, Inject } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from "../../models/user.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseApp } from "angularfire2";

@Injectable()
export class UserProvider {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(
    private angularFire: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    @Inject(FirebaseApp) private firebaseApp: any
  ) {
    this.users = this.angularFire.list('/users');
    this.listenAuthState();
  }

  private setUser(uidToExclude: string): void {
    this.users = <FirebaseListObservable<User[]>>  this.angularFire.list(`/users`, {
      query: {
        orderByChild: 'name'
      }
    }).map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  private listenAuthState(): void {
    this.angularFireAuth.authState
        .subscribe((authState: firebase.User) => {
          if (authState) {
            this.currentUser = this.angularFire.object(`/users/${authState.uid}`);
            this.setUser(authState.uid);
          }
        });
  }

  create(user: User, uid: string): firebase.Promise<void> {
    return this.angularFire.object(`/users/${uid}`).set(user);
  }

  edit(user: { name: string, username: string, photo: string }): firebase.Promise<void> {
    return this.currentUser.update(user);
  }

  userExists(username: string): Observable<boolean> {
    return this.angularFire.list('/users', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map(users => {
      return users.length > 0;
    });
  }

  getUser(userId: string): FirebaseObjectObservable<User> {
    return this.angularFire.object(`/users/${userId}`);
  }

  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/users/${userId}`)
      .put(file);
  }

}
