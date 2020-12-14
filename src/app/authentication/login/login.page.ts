import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit() {
  }

  login(email, password){
    this.authSvc.login(email.value, password.value)
    .then((res) => {
      this.authSvc.fetch(res.user.email)
      .then((res) => {
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
}
