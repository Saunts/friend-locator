import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  ionViewDidEnter(){
    console.log('test1');
    var uid = JSON.parse(localStorage.getItem('user'));
    if(!localStorage.getItem('profile')){
      this.router.navigateByUrl('/login');
    }
  }

  

}
