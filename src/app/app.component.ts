import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';
import Parse from 'parse';

let parse = require('parse');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private nativePageTransitions: NativePageTransitions, public navigate : NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
  ) {
    this.goHome();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //setup push
      this.notificationSetup();
    });
  }

  goHome() {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
  
      user != null ? this.navigate.navigateRoot('/orders') : this.navigate.navigateRoot('/');
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



  ///push code
  
  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}
