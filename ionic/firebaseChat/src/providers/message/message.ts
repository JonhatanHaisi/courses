import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Message } from "../../models/message.model";

import * as firebase from 'firebase';

@Injectable()
export class MessageProvider {

  constructor(
    private angularFire: AngularFireDatabase
  ) {}

  create(message: Message, list: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return list.push(message);
  }

  getMessages(userId1: string, userId2: string): FirebaseListObservable<Message[]> {
    return this.angularFire.list(`/messages/${userId1}-${userId2}`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 20
      }
    });
  }

}
