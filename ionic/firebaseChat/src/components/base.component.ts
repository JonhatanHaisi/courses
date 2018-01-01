import { NavController, AlertController, App, MenuController } from "ionic-angular";
import { AuthProvider } from "../providers/auth/auth";
import { OnInit } from "@angular/core";
import { SigninPage } from "../pages/signin/signin";

export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController;

    constructor (
        protected alertCtrl: AlertController,
        protected authProvider: AuthProvider,
        protected app: App,
        protected menuCtrl: MenuController
    ){}

    ngOnInit() {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout() {
        this.alertCtrl.create({
            message: "Do you want to quit?",
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.authProvider.logout()
                            .then(() => {
                                this.navCtrl.setRoot(SigninPage);
                                this.menuCtrl.enable(false, 'user-menu');
                            }).catch(() => console.log('Deu ruim'));
                    }
                },
                {
                    text: 'No'
                }
            ]
        }).present();
    }

}