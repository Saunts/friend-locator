import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  testimg: any;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.testimg = 'data:image/jpeg;base64,' + this.user.avatar;
    console.log(this.testimg);
    console.log(this.user.displayname);
  }

  ngOnDestroy(){

  }

  ionViewWillEnter() {
    if(!localStorage.getItem('profile')){
      this.router.navigateByUrl('/login');
    }
    this.ngOnInit();
  }

  logout(){
    this.authSvc.logout();
  }

  newpic(){
    this.ngOnDestroy();
    this.router.navigateByUrl('/home/profile/profilepic');
  }

}
