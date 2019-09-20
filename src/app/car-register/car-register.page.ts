import { Component, OnInit, ɵConsole } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { BuypindriverService } from "./../../app/buypindriver.service";
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require('parse');

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.page.html',
  styleUrls: ['./car-register.page.scss'],
})

export class CarRegisterPage implements OnInit {
  name: any;
  address: any;
  make: any;
  model: any;
  year: any;
  license: any
  color: any;

  constructor(
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController,
    public provider: BuypindriverService,
    public alert: AlertController
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    this.name = Parse.User.current().get('fullName');
  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    // this.provider.plate = object;
    // console.log(this.provider.plate);
    this.provider.plate = this.license;
    console.log(options);
    this.nativePageTransitions.fade(options);
    // this.navigate.navigateRoot("/licence-photo");
    this.navigate.navigateRoot("/car-picture");
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/driver-info");
  }

  setCar() {
    console.log(this.address);
    console.log(this.make);
    console.log(this.model);
    console.log(this.year);
    console.log(this.license);
    console.log(this.color);

    if(this.address == null ||  this.address == '' || this.make == null || this.make == '' || this.model == null || this.model == '' || this.year == null || this.year == '' || 
       this.license == null || this.license == '' || this.color == null || this.color == '')
       {
          this.notEqual();
          return;
       }

      Parse.Cloud.run('addCar', {
        userId: Parse.User.current().id,
        address: this.address,
        make: this.make,
        model: this.model,
        year: this.year,
        license: this.license,
        color: this.color

      }).then((result) => {
        console.log(result);
        this.provider.carObject = result;
        this.openPage();
      }, (error) => {
        console.log(error);
      });
  }

  async notEqual() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Todos los campos son requeridos.',
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
