import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authSvc: AuthService,
    public router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login(email, password){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });

    const toast = await this.toastController.create({
      message: 'Wrong email or password.',
      duration: 2000
    });
    
    this.authSvc.login(email.value, password.value)
    .then((res) => {
      this.authSvc.fetch(res.user.email)
      .then(async (res) => {
        loading.present();
        this.authSvc.fetchfriend()
        loading.dismiss();
        this.router.navigateByUrl('/home');
      })
    })
    .catch((err) => {
      toast.present();
      console.log(err);
    });
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  async presentLoading() {
    

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
}
