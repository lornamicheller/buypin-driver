import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { Parse } from 'parse';

const parse = require("parse");

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  name: any;
  phone: any;
  email: any;

  constructor(
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = "https://parseapi.back4app.com";
  }

  ngOnInit() {
    console.log(Parse.User.current());
    this.getUserData();
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/orders");
  }

  openInfo() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/edit-info");
  }

  openDriver() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/edit-driver");
  }

  openVehicle() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/edit-vehicle");
  }

  getUserData() {
    console.log("buscando la data");
    this.name = Parse.User.current().get("fullName");
    this.phone = Parse.User.current().get("phoneNumber");
    this.email = Parse.User.current().get("email");
  }
}
