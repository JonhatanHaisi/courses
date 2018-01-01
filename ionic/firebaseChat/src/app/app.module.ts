import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { FIREBASE_APP_CONFIG } from './config/firebase-config';

import { SignupPageModule } from "../pages/signup/signup.module";
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';
import { ChatPage } from "../pages/chat/chat";
import { ChatProvider } from '../providers/chat/chat';
import { MessageProvider } from '../providers/message/message';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserProfilePage } from "../pages/user-profile/user-profile";
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { SigninPage } from "../pages/signin/signin";
import { CustomLoggedHeaderComponent } from "../components/custom-logged-header/custom-logged-header";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage,
    ProgressBarComponent,
    SigninPage,
    CustomLoggedHeaderComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_APP_CONFIG),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SignupPageModule,
    AngularFireAuthModule
  ],
  exports: [
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    UserProfilePage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    ChatProvider,
    MessageProvider
  ]
})
export class AppModule {}
