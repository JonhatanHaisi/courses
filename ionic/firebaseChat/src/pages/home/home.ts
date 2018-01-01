import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { SignupPage } from "../signup/signup";
import { UserProvider } from "../../providers/user/user";
import { FirebaseListObservable } from "angularfire2/database";
import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat/chat";
import { Chat } from "../../models/chat.model";
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  chats: FirebaseListObservable<Chat[]>;

  view = 'chats';

  constructor(
    private navCtrl: NavController, 
    private userProvider: UserProvider, 
    private authProvider: AuthProvider,
    private chatProvider: ChatProvider,
    private menuController: MenuController
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatProvider.chats;
    this.users = this.userProvider.users;
    this.menuController.enable(true, 'user-menu');
  }

  openSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  filterItems(event: any): void {
    const searchTerm = event.target.value;

    this.chats = this.chatProvider.chats;
    this.users = this.userProvider.users;

    if (searchTerm) {
      switch(this.view) {
        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>> this.chats
              .map((chats: Chat[]) => {
                return chats.filter((chat: Chat) => {
                  return chat.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
              });
          break;
        case 'users':
          this.users = <FirebaseListObservable<User[]>> this.users
              .map((users: User[]) => {
                return users.filter((user: User) => {
                  return user.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1;
                });
              });
          break;
      }
    }
  }

  onChatCreate(user: User): void {
    this.userProvider.currentUser
        .first()
        .subscribe((currentUser: User) => {
          this.chatProvider.getDeepChat(currentUser.$key, user.$key)
              .first()
              .subscribe((chat: Chat) => {
                if (chat.hasOwnProperty('$value')) {

                  const timestamp: any = firebase.database.ServerValue.TIMESTAMP;

                  const senderChat = new Chat('', timestamp, user.name, '');
                  this.chatProvider.create(senderChat, currentUser.$key, user.$key);

                  const recipientChat = new Chat('', timestamp, currentUser.name, '');
                  this.chatProvider.create(recipientChat, user.$key, currentUser.$key);

                }
              });
        });

    this.navCtrl.push(ChatPage, {
      recipientUser: user
    });
  }

  onChatOpen(chat: Chat): void {
    const recipientId = chat.$key;
    this.userProvider.getUser(recipientId)
        .first()
        .subscribe((recipient: User) => {
          this.navCtrl.push(ChatPage, {
            recipientUser: recipient
          });
        });
  }

}
