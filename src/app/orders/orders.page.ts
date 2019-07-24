import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { Parse } from 'parse';

let parse = require("parse");

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(public menu: MenuController, private nativePageTransitions: NativePageTransitions, public navigate : NavController) { 
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo"); 
    Parse.serverURL = "https://parseapi.back4app.com"; 
  }

  ngOnInit() {
    console.log(Parse.User.current());
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log("is working");
  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/order-info");
  }

  openAccountPage() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/account");
  }

  stayHome() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/orders");
  }

  openEarnings() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/earnings");
  }

  logoutTransition() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/login");
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
    console.log('Logged out successfully', resp);
    this.logoutTransition();
    }, err => {
    console.log('Error logging out', err);
    });
    }

}
