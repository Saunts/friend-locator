import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async login(email, password){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
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
