import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignupPage } from "../signup/signup";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  private signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public authProvider: AuthProvider) {
  
    this.signinForm = formBuilder.group({
      email: [ '', [ Validators.required, Validators.compose([ Validators.required ]) ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    });

  }

  onSubmit(): void {
    this.authProvider.signinWithEmail(this.signinForm.value)
        .then(isLoged => {
          this.navCtrl.setRoot(HomePage);
        });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
