import { Injectable, NgZone } from '@angular/core';
import { User } from './auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Profile } from './profile';
import { LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    public firestore: AngularFirestore,
    public afauth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
    this.afauth.authState.subscribe(user => {
      if(user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

  async fetch(email){
    console.log(email);
    await this.firestore.collection('profile').doc(email).get().toPromise()
    .then((res) => {
      console.log("Success in Fetching data");
      // console.log(res.data());
      // console.log(JSON.stringify(res.data()));
      localStorage.setItem('profile', JSON.stringify(res.data()));
      // this.firestore.collection
    })
    .catch((err) => {
      console.log(err);
    })
  }

  login(email, password){
    return this.afauth.signInWithEmailAndPassword(email, password);
  }

  register(email, password){
    return this.afauth.createUserWithEmailAndPassword(email, password);
  }

  newprofile(uid, email, displayname, lat, lng){

    console.log(email);
    console.log(uid);
    console.log(displayname);
    console.log(lat);
    console.log(lng);
    this.firestore.collection('profile').doc(email).set({
      email: email,
      displayname: displayname,
      lat: lat,
      lng: lng,
      friend: []
    });
  }

  logout(){
    return this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      localStorage.removeItem('friend');
      this.router.navigateByUrl('/login');
    })
  }

  async addfriend(email){
    var profile: any;
    console.log(email.value);

    const toast = await this.toastController.create({
      message: 'Email is not registered.',
      duration: 2000
    });

    // try{
      this.firestore.collection('profile').doc(email.value).get().toPromise()
      .then((res) => {
        if(res.data() != null){
          var current = JSON.parse(localStorage.getItem('profile'));
          console.log(current);
          current.friend.push(email.value);
          console.log(current);
          localStorage.setItem('profile', JSON.stringify(current));
          this.firestore.collection('profile').doc(current.email).update(current);
          this.fetchfriend();
          this.router.navigateByUrl('/home/friend');
        }
        else{
          toast.present();
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // }
    // catch(exceptions){
    //   toast.present();
    // }
    
    
  }

  async fetchfriend(){
    var friend = [];
    localStorage.setItem('friend', JSON.stringify(friend));
    var friends = JSON.parse(localStorage.getItem('profile')).friend;
    friends.forEach(element => {
    this.firestore.collection('profile').doc(element).get().toPromise()
    .then((res) => {
      console.log(res.data());
      // friend.push(res.data());
      var f = JSON.parse(localStorage.getItem('friend'));
      f.push(res.data());
      localStorage.setItem('friend', JSON.stringify(f));
    })
   });
   
  }

  async remove(email){

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });

    const toast = await this.toastController.create({
      message: 'Friend has been removed',
      duration: 2000
    });

    var user = JSON.parse(localStorage.getItem('profile'));

    var i = user.friend.indexOf(email);
    user.friend.splice(i, 1);

    loading.present();

    localStorage.removeItem('profile');
    localStorage.setItem('profile', JSON.stringify(user));

    this.firestore.collection('profile').doc(user.email).update(user);

    this.fetchfriend();
    
    loading.dismiss();

    toast.present();

    this.router.navigateByUrl('/home');

  }

}
