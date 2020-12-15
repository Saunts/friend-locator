import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;
  friend: any;
  map: any;
  @ViewChild('map', {read:ElementRef, static: false}) mapRef: ElementRef;

  constructor(
    private authSvc: AuthService,
    private firestore: AngularFirestore,
    // private map: MapsAPILoader,
    private router: Router
  ) {}

  ionViewDidEnter(){
    console.log('test1');
    this.user = JSON.parse(localStorage.getItem('profile'));
    if(!localStorage.getItem('profile')){
      this.router.navigateByUrl('/login');
    }

    console.log(this.user);
    
    this.friend = JSON.parse(localStorage.getItem('friend'));

    console.log(this.friend);

    this.showMap(this.user.lat, this.user.lng);
  }

  showMap(lat, lng){
    const location = new google.maps.LatLng(lat, lng);
    const options = {
      center: location,
      zoom: 13,
      disableDefaultUI:true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    const marker = new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
    });

    this.friend.forEach((f) => {
      var flat = f.lat;
      var flng = f.lng;
      console.log(f.displayname.substring(0, 1));
      const flocation = new google.maps.LatLng(flat, flng);
      const fmarker = new google.maps.Marker({
        position: flocation,
        map: this.map,
        label: f.displayname.substring(0, 1),
        // shape: {
        //   coords: [
        //     flat,
        //     flng,
        //     2
        //   ],
        //   type: 'circle'
        // }
      });
    });
  }

  async checkin(){
    var lat;
    var lng;
    var u = JSON.parse(localStorage.getItem('profile'));
    await navigator.geolocation.getCurrentPosition((res) => {
      lat = res.coords.latitude;
      lng = res.coords.longitude;
      console.log(res.coords.latitude);

      u.lat = lat;
      u.lng = lng;
      localStorage.setItem('profile', JSON.stringify(u));

    console.log(u);
    this.firestore.collection('profile').doc(u.email).update(u);
    this.ionViewDidEnter();  
    },
    (err) => {
      console.log(err);
    });
  }

  center(){
    this.ionViewDidEnter();
  }

  

}
