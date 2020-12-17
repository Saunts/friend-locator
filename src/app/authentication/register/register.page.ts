import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from 'src/app/auth.service';
import { Platform } from '@ionic/angular';
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
    private toastController: ToastController,
    private platform: Platform
  ) { }

  ngOnInit() {
    console.log('test');
  }

  async signUp(email, password, displayname){
    var lat: any;
    var lng: any;
    console.log(email);
    console.log(displayname.value);
    if(displayname.value.length <= 1){
      const toast = await this.toastController.create({
        message: "Username can't be empty",
        duration: 2000
      });
      toast.present();
      return;
    }
    else{
      this.platform.ready().then(() => {
        navigator.geolocation.getCurrentPosition((res) => {
          lat = res.coords.latitude;
          lng = res.coords.longitude;
          console.log(lat, lng);
          this.authSvc.register(email.value, password.value)
          .then((res) => {
            console.log('New account created');
            console.log(displayname);
            this.authSvc.newprofile(res.user.uid, res.user.email, displayname.value, lat, lng);
            this.router.navigateByUrl('/login');
          }).catch(async (error) => {
            console.log(error);
            const toast = await this.toastController.create({
              message: error.message,
              duration: 2000
            });
            toast.present();
          })
        },
        async (err) => {
          console.log(err);
          const toast = await this.toastController.create({
            message: "Please allow location service",
            duration: 2000
          });
          toast.present();
        });
      })
    }


  }

}
