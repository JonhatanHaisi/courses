import { Component } from '@angular/core';
import { Platform } from 'ionic-angular'; // MenuController
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertPage } from '../pages/alert/alert';
import { ButtonsPage } from '../pages/buttons/buttons';
import { CardsPage } from '../pages/cards/cards';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
  pages: Array<{ title: string, icon: string, component: any }>;
  rootPage:any = HomePage;

  // , private menuCtrl: MenuController
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.pages = [
      { title:"Home", icon:"home", component: HomePage },
      { title:"Alert", icon:"arrow-forward", component: AlertPage },
      { title:"Buttons", icon:"arrow-forward", component: ButtonsPage },
      { title:"Cards", icon:"arrow-forward", component: CardsPage },
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
      //this.menuCtrl.close('left');
  }
  
  
}

