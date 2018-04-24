import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertPage } from '../pages/alert/alert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
  pages: Array<{ title: string, icon: string, component: any }>;
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    
    this.pages = [
      { title:"Home", icon:"home", component: HomePage },
      { title:"Alert", icon:"arrow-forward", component: AlertPage },
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

