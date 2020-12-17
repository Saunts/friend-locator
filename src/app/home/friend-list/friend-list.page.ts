import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {

  friend: any = [];

  constructor(
    private authSvc: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit( ) {
    
  }

  ionViewWillEnter() {
    this.friend = JSON.parse(localStorage.getItem('friend'));
    if(!localStorage.getItem('profile')){
      this.router.navigateByUrl('/login');
    }
  }

  addfriend(){
    this.router.navigateByUrl('/home/friend/addfriend');
  }

  async presentAlert(email){
    const alert = await this.alertCtrl.create({
      header: 'Remove friend',
      message: 'Remove this friend?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => this.delete(email)
        }
      ]
    });
    await alert.present();
  }

  delete(email){
    // var friends = JSON.parse(localStorage.getItem('friend'));
    // // this.friend.array.forEach((f) => {
    // //   if(f.email === email){
    // //     f.pop;
    // //   }
    // // });

    console.log(email);
    this.authSvc.remove(email);

  }

}
