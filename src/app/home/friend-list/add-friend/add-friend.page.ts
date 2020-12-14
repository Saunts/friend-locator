import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

  add(email){
    this.authSvc.addfriend(email);
  }

}
