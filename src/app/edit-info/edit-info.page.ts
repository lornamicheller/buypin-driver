import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import {AlertController} from '@ionic/angular';
import { Parse } from "parse";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

let parse = require("parse");

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})

export class EditInfoPage implements OnInit {
  name: any;
  phone: any;
  email: any;
  allZipCode:any;
  zipCodeArray:any;

  constructor(
    private camera: Camera,
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController,
    public alert:AlertController

  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = "https://parseapi.back4app.com";
  }

  ngOnInit() {
 
    this.getUserData();
    this.getZipCode();
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
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/account");
  }

  saveInfo() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/account");
  }

  getUserData() {
    //  set the default data 
    this.name = Parse.User.current().get('fullName');
    this.phone = Parse.User.current().get('phoneNumber');
    this.email = Parse.User.current().get('email');
    this.zipCodeArray = Parse.User.current().get('workZipCode');
  }

  setNewData(){
    console.log("Save Change");
   
    if(this.name == null || this.name == '' || this.email == null || this.email =='' || this.phone == null || this.phone == '')
    {
      this.errorInfo();
      return;
    }

    else if(this.name != null && this.email != null && this.phone != null )
    {
         // update data
        Parse.User.current().set('fullName', this.name);
        Parse.User.current().set('email', this.email);
        Parse.User.current().set('phoneNumber', this.phone);
        Parse.User.current().set('workZipCode', this.zipCodeArray);
        
        Parse.User.current().save().then((result)=> {
            console.log(result);
          
            this.savedInfo();
            this.saveInfo();
        });

    }

   
  }

 
  async savedInfo(){
  const alert = await this.alert.create({
    header: '¡ALERTA!',
    message: 'Su información ha sido guardada exitosamente.',
    buttons: [
        {
          text: 'OK',
          cssClass: 'greenBtn',
        }
      ]
    });
  
    await alert.present();
  }


  async errorInfo(){
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Todos los campos son requeridos.',
      buttons: [
          {
            text: 'OK',
            cssClass: 'greenBtn',
          }
        ]
      });
    
      await alert.present();
    }

}
