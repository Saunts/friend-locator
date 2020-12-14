import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from 'src/app/auth.service';
// const geo = Geolocation;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authSvc: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('test');
  }

  async signUp(email, password, displayname){
    var lat: any;
    var lng: any;
    console.log(email);
    console.log(displayname.value);
    // await this.geo.getCurrentPosition().then((res) => {
    //   lat = res.coords.latitude;
    //   lng = res.coords.longitude;
    // }).catch((error) => {
    //   console.log(error);
    // });

    await navigator.geolocation.getCurrentPosition((res) => {
      lat = res.coords.latitude;
      lng = res.coords.longitude;
    },
    (err) => {
      console.log(err);
    });

    // await Geolocation.getCurrentPosition()
    // .then((res) => {
    //   lat = res.coords.latitude;
    //   lng = res.coords.longitude;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    console.log(lat, lng);
    this.authSvc.register(email.value, password.value)
    .then((res) => {
      console.log('New account created');
      console.log(displayname);
      this.authSvc.newprofile(res.user.uid, res.user.email, displayname.value, lat, lng);
      this.router.navigateByUrl('/login');
    }).catch((error) => {
      console.log(error);
    })
  }

}
