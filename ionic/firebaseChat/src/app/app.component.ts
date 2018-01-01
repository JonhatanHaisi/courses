import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from "../pages/signin/signin";
import { User } from "../models/user.model";
import { AuthProvider } from "../providers/auth/auth";
import { UserProvider } from "../providers/user/user";
import { HomePage } from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = SigninPage;
  currentUser: User;

  constructor (
    userProvider: UserProvider,
    authProvider: AuthProvider,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {

    authProvider.auth.authState
      .subscribe(authState => {
        if (authState) {
          userProvider.currentUser
               .subscribe(user => {
                 this.currentUser = user;
                 this.rootPage = HomePage;
               });
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

