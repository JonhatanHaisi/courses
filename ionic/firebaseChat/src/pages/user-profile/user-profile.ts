import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { User } from "../../models/user.model";
import { UserProvider } from "../../providers/user/user";

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  private currentUser: User;
  private canEdit: boolean = false;
  private photoFile: File;
  private uploadProgress: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private userProvider: UserProvider
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider.currentUser
        .subscribe((user: User) => {
          this.currentUser = user;
        });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.photoFile) {

      const uploadTask = this.userProvider.uploadPhoto(this.photoFile, this.currentUser.$key);
      uploadTask.on('state_changed', snapshot => {
        this.uploadProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);

      }, (error: Error) => {
        // catch errors
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });

    } else {
      this.editUser();
    }
  }

  onPhoto(event: any) {
    this.photoFile = event.target.files[0];
  }

  private editUser(photo?: string): void {
    this.userProvider.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photo || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
      this.photoFile = undefined;
      this.uploadProgress = undefined;
    });
  }

}
