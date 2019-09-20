import { Component, OnInit } from "@angular/core";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions/ngx";
import { AlertController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { Parse } from "parse";

let Parse = require("parse");

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  name: any;
  phone: any;
  email: any;
  password: any;
  role: any;
  confirmPassword: any;
  allZipCode: any;

  zipCodeArray: any;

  constructor(
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController,
    public alert: AlertController
  ) {
    // this.role = 'E';
    Parse.initialize(
      "C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO",
      "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo"
    );
    Parse.serverURL = "https://parseapi.back4app.com";
  }

  ngOnInit() {
    this.getZipCode();
  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/driver-info");
  }

  getZipCode() {
    // get all zipcodes
    Parse.Cloud.run("getZipCodes", {}).then(
      result => {
        this.allZipCode = result;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/login");
  }

  signUserUp() {
    console.log(this.name);
    console.log(this.phone);
    console.log(this.email);
    console.log(this.password);
    console.log(this.role);
    // console.log(this.zipCodeArray);

    if (this.name == null || this.name == '' || this.phone == null || this.phone == '' || this.email == null || this.email == '' || this.password == null || this.password == '' || this.confirmPassword == null || this.confirmPassword == '' ) {
      this.empty();
      console.log("Esta vacio");
      return;
    }
    if(this.name != null && this.name != '' && this.phone != null && this.phone != '' && this.email != null && this.email != '' && this.password != null && this.password != '' && this.confirmPassword != null && this.confirmPassword != '')
    {
        console.log("no es null");

        if (this.password != this.confirmPassword) 
        {
          this.notEqual();
          console.log("los password no son los mismo");
          return;
        }
        else if(this.password === this.confirmPassword)
        {
          console.log("Se puede añadir");


              const user = new Parse.User();
              user.set("fullName", this.name);
              user.set("phoneNumber", this.phone);
              user.set("email", this.email);
              user.set("password", this.password);
              user.set("username", this.email);
              // user.set("workZipCode", this.zipCodeArray);
              user.set("role", "E");
              user.set("isApproved", false);

              user
                .signUp()
                .then(user => {
                  console.log("user logged in");
                  // this.test("Data almacenada");
                  this.openPage();
                })
                .catch(error => {
                  // this.test(JSON.stringify(error));
                  this.messageFail("El email ingresado está asociado a una cuenta registrada.");
                  console.log(error);
                });

         }

    }
  }

  async empty() {
    const alert = await this.alert.create({
      header: "¡ALERTA!",
      message: "Todos los campos son requeridos",
      buttons: [
        {
          text: "OK",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }
      ]
    });
    await alert.present();
  }

  async notEqual() {
    const alert = await this.alert.create({
      header: "¡ALERTA!",
      message: "Las contraseñas no coinciden",
      buttons: [
        {
          text: "OK",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }
      ]
    });
    await alert.present();
  }

  async test(e) {
    const alert = await this.alert.create({
      header: "¡ALERTA!",
      message: e,
      buttons: [
        {
          text: "OK",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }
      ]
    });
    await alert.present();
  }

  async messageFail(e) {
    const alert = await this.alert.create({
      header: "¡ALERTA!",
      message: e,
      buttons: [
        {
          text: "OK",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }
      ]
    });
    await alert.present();
  }
}
