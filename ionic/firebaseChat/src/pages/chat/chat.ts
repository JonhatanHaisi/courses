import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { User } from "../../models/user.model";
import { UserProvider } from "../../providers/user/user";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Message } from "../../models/message.model";
import { MessageProvider } from "../../providers/message/message";

import * as firebase from 'firebase';
import { Chat } from "../../models/chat.model";
import { ChatProvider } from "../../providers/chat/chat";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  private messages: FirebaseListObservable<Message[]>;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  private pageTitle: string;
  private sender: User;
  private recipient: User;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private authProvider: AuthProvider,
    private userProvider: UserProvider,
    private messageProvider: MessageProvider,
    private chatProvider: ChatProvider
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userProvider.currentUser
        .first()
        .subscribe((currentUser: User) => {
          this.sender = currentUser;

          this.chat1 = this.chatProvider.getDeepChat(currentUser.$key, this.recipient.$key);
          this.chat2 = this.chatProvider.getDeepChat(this.recipient.$key, currentUser.$key);

          this.chat1.first()
              .subscribe((chat: Chat) => {
                this.chatProvider.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
              });

          const doSubscribe = () => {
            this.messages.subscribe(() => this.scrollToBotton())
          };

          this.messages = this.messageProvider.getMessages(this.sender.$key, this.recipient.$key);
          this.messages.first()
                       .subscribe((messages: Message[]) => {
                         if (messages.length === 0) {
                           this.messages = this.messageProvider.getMessages(this.recipient.$key, this.sender.$key);
                         }
                         doSubscribe();
                       });
        });
  }

  sendMessage(newMessage: string): void {
    if (newMessage) {
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      this.messageProvider.create(new Message(this.sender.$key, newMessage, timestamp as any), this.messages)
                          .then(() => {
                            this.chat1.update({ lastMessage: newMessage, timestamp: timestamp });
                            this.chat2.update({ lastMessage: newMessage, timestamp: timestamp });
                          });
    }
  }

  private scrollToBotton(duration: number = 300) {
    setTimeout(() => {
      if (this.content) this.content.scrollToBottom(duration);
    }, 50);
  }

}
