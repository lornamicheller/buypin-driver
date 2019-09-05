import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { Parse } from 'parse';

let parse = require("parse");

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: any;
  password: any;

  constructor(private nativePageTransitions: NativePageTransitions, public navigate : NavController, public alert: AlertController) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo"); 
    Parse.serverURL = "https://parseapi.back4app.com"; 
   }

  ngOnInit() {
  }

  openPage() {

    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/register");
  }

  openPage2() {

    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/orders");
  }

  openPage3()
  {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/forgot-password");
  }

  signIn() {
    if (this.username == null || this.password == null) {
    this.empty();
    } else {
    Parse.User.logIn(this.username, this.password).then((resp) => {
    console.log(this.username);
    console.log(this.password);
    console.log('Logged in successfully', resp);
    if(resp.get("role") == "C")
    {
      this.customer();
      return;
    }
    this.openPage2();
    }, err => {
    console.log('Error logging in', err);
    });
    }
    }

    async empty() {
    const alert = await this.alert.create({
    header: '¡ALERTA!',
    message: 'Todos los campos son requeridos',
    buttons: [{
    text: 'OK',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {
    console.log('Confirm Cancel');
    }
    }]
    });
    await alert.present();
  }

  async customer() {
    const alert = await this.alert.create({
    header: '¡ALERTA!',
    message: 'Su cuenta esta registrada como cliente de BuyPin. Por favor inicie sección en la aplicación BuyPin Client.',
    buttons: [{
    text: 'OK',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {
    console.log('Confirm Cancel');
    }
    }]
    });
    await alert.present();
  }

}
