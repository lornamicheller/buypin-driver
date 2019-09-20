import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import Parse from 'parse';

let parse = require('parse');
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }

  ngOnInit() {
    // this.goHome();
  }

  goHome() {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
  
      user != null ? this.navigate.navigateRoot('/orders') : this.navigate.navigateRoot('/tutorial');
    }, err => {
      console.log('Error getting logged user',err);
      let options: NativeTransitionOptions = {
        duration: 300, 
        iosdelay: 300
       }
       console.log(options);
       this.nativePageTransitions.fade(options);
      });
      
      this.navigate.navigateRoot("/login");
  }


  openPage() {

      let options: NativeTransitionOptions = {
        duration: 300, 
        iosdelay: 300,
        androiddelay: 100,
      }
      console.log(options);
      this.nativePageTransitions.fade(options);
      this.navigate.navigateRoot("/login");
    }
}

