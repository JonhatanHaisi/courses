import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";
import { AlertController, App, MenuController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { User } from "../../models/user.model";

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;
  @Input() user: User;

  constructor(
        protected alertCtrl: AlertController,
        protected authProvider: AuthProvider,
        protected app: App,
        protected menuCtrl: MenuController
  ) { super(alertCtrl, authProvider, app, menuCtrl); }

}
