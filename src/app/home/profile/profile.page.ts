import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile'));
    console.log(this.user.displayname);
  }

  logout(){
    this.authSvc.logout();
  }

}
