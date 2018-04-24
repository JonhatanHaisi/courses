import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {

    text: string = 'No content';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPage');
  }
  
  
  showAlert() {
      const alert = this.alertCtrl.create({
          title: 'My Alert',
          message: 'This is an example of alert',
          inputs: [
            {
                name: 'name',
                placeholder: 'your name'
            }
          ],
          buttons: [ 
            {
                text: 'Cancel'
            },
            {
                text: 'Ok',
                handler: (data) => {
                    this.text = data.name;
                }
            }
          ]
      });
      
      alert.present();
  }

}
