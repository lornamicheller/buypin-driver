import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  username: any;
  email:any;
  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert: AlertController
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    
  }

  openPage() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/login");
  }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/login");
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

   
  resetPass(){
    Parse.User.requestPasswordReset(this.email).then(() => {
      // Password reset request was sent successfully
      if (typeof document !== 'undefined') 
      console.log('Reset password email sent successfully'); 
      this.goBack();
    }).catch((error) => {
      if (typeof document !== 'undefined') console.log(`Error while creating request to reset user password: ${JSON.stringify(error)}`);
      console.error('Error while creating request to reset user password', error);
    });
  }

}
