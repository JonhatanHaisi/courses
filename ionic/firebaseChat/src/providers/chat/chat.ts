import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { Chat } from "../../models/chat.model";

import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class ChatProvider {

  chats: FirebaseListObservable<Chat[]>;

  constructor(
    private angularFire: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    this.setChats();
  }

  private setChats(): void {
    this.angularFireAuth.authState
        .subscribe(authState => {
          if (authState) {
            this.chats = <FirebaseListObservable<Chat[]>> this.angularFire.list(`/chats/${authState.uid}`, {
              query: {
                orderByChild: 'timestamp'
              }
            }).map((chats: Chat[]) => chats.reverse());
          }
        });
                     
  }

  public create(chat: Chat, senderId: string, recipientId: string): firebase.Promise<void> {
    delete chat.$key;
    return this.angularFire.object(`/chats/${senderId}/${recipientId}`).set(chat);
  }

  public getDeepChat(senderId: string, recipientId: string): FirebaseObjectObservable<Chat> {
    return this.angularFire.object(`/chats/${senderId}/${recipientId}`);
  }

  public updatePhoto(chat: FirebaseObjectObservable<Chat>, chatPhoto: string, recipientUserPhoto: string): firebase.Promise<boolean> {
    if (chatPhoto !== recipientUserPhoto) {
      return chat.update({
        photo: recipientUserPhoto
      }).then(() => true);
    }
      return <firebase.Promise<boolean>> Promise.resolve(false);
  }

}
