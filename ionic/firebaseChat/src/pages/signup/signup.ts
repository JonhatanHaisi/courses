import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/first';

import { UserProvider } from "../../providers/user/user";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private emailPattern = /^.+$/;
  private signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userProvider: UserProvider,
    private authService: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.signupForm = formBuilder.group({
      name: [ '', [ Validators.required, Validators.minLength(3) ] ],
      username: [ '', [ Validators.required, Validators.minLength(3) ] ],
      email: [ '', [ Validators.required, Validators.compose([ Validators.required, Validators.pattern(this.emailPattern) ]) ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    });
  }

  onSubmit(): void {

    const loading = this.showLoading();
    const formUser = this.signupForm.value;
    const username = formUser.username;

    this.userProvider.userExists(username)
      .first()
      .subscribe(exists => {
        
        if (!exists) {

          this.authService.createAuthUser({
                email: formUser.email,
                password: formUser.password
              }).then(authState => {
                delete formUser.password;
                const uid = authState.uid;

                this.userProvider.create(this.signupForm.value, uid)
                                .then(() => {
                                  loading.dismiss();
                                  this.navCtrl.setRoot(HomePage);
                                })
                                .catch(erro => {
                                  loading.dismiss();
                                  this.showAlert(erro.message);
                                });

              }).catch(erro => {
                loading.dismiss();
                this.showAlert(erro.message);
              });

        } else {
          this.showAlert(`O username ${username} já esta sendo usado em outra conta`);
          loading.dismiss();
        }

      });
    

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    return loading;
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: [ 'ok' ]
    }).present();
  }

}
