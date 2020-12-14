import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {

  friend: any = [];

  constructor(
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit( ) {
    var friends = JSON.parse(localStorage.getItem('profile')).friend;
    friends.forEach(element => {
      this.firestore.collection('profile').doc(element).get().toPromise()
      .then((res) => {
        console.log(res.data());
        this.friend.push(res.data());
      })
    });
  }


  addfriend(){
    this.router.navigateByUrl('/home/friend/addfriend');
  }

  async presentAlert(email){
    const alert = await this.alertCtrl.create({
      header: 'Deleting Item',
      message: 'Delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.delete(email)
        }
      ]
    });
    await alert.present();
  }

  delete(email){

  }

}
