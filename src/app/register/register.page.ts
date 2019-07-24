import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { Parse } from 'parse';

let parse = require("parse");


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: any;
  phone: any;
  email: any;
  password: any;
  role: any;
  confirmPassword: any;

  constructor(private nativePageTransitions: NativePageTransitions, public navigate : NavController, public alert: AlertController) {
    this.role = 'e';
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
    this.navigate.navigateRoot('/driver-info');
  }

  goBack() {

    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/login');
  }

  signUserUp() {
    console.log(this.name);
    console.log(this.phone);
    console.log(this.email);
    console.log(this.password);
    console.log(this.role);
    const user = new Parse.User();

    if (this.password != this.confirmPassword) {
      this.notEqual();
    }
    else if(this.name == null || this.phone == null || this.email == null || this.password == null || this.confirmPassword == null) {
      this.empty();
    }
    else {
      user.set('fullName', this.name);
      user.set('phoneNumber', this.phone);
      user.set('email', this.email);
      user.set('password', this.password);
      user.set('username', this.email);

      user.signUp().then((user) => {
        console.log('user logged in')
        this.openPage();
      }).catch((error) => {
        console.log(error);
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

  async notEqual() {
    const alert = await this.alert.create({
    header: '¡ALERTA!',
    message: 'Las contraseñas no coinciden',
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

