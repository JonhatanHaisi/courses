import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
  pages: Array<{ title: string, icon: string, component: any }>;
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.pages = [
      { title:"Home", icon:"home", component: HomePage }
    ];  
      
    platform.ready().then(() => {        
        
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  openPage(p: { title: string, icon: string, component: any }): void {
      this.rootPage = p.component;
  }
  
  
}

