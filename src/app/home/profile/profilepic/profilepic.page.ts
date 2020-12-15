import { Component, OnInit } from '@angular/core';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.page.html',
  styleUrls: ['./profilepic.page.scss'],
})
export class ProfilepicPage implements OnInit {

  img: any;
  constructor(
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router
  ) {
   }

  ngOnInit() {
  }

  loadImageFromDevice(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }



  async _handleReaderLoaded(readerEvt) {

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Uploading...'
    });

    var binaryString = readerEvt.target.result;
    this.img= btoa(binaryString);
    console.log(btoa(binaryString));

    var user = JSON.parse(localStorage.getItem('profile'));
    user.avatar = this.img;
    console.log(user);

    loading.present();
    localStorage.setItem('profile', JSON.stringify(user));
    this.firestore.collection('profile').doc(user.email).update(user);
    loading.dismiss();

    this.router.navigateByUrl('/home/profile');
  }
}
