import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public auth: AngularFireAuth) {}

  createAuthUser(user: { email: string, password: string }): firebase.Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signinWithEmail(user: { email: string, password: string }): firebase.Promise<boolean> {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
               .then(authState => {
                 return authState !== null;
               }).catch(err => console.log(err));
  }

  logout(): firebase.Promise<void> {
    return this.auth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.authState
          .first()
          .subscribe((authState: firebase.User) => {
            authState ? resolve(true) : reject(false)
          });
    });
  }

}
