import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from "@ionic/angular";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AnyARecord } from 'dns';
import { Parse } from "parse";
import { BuypindriverService } from "./../../app/buypindriver.service";
let parse = require("parse");

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})

export class EditVehiclePage implements OnInit {
  picture: any;
  savedPhoto: any;
  currentUser: any;
  licensePic: any;
  expDate: any;
  license: any;
  make: any;
  items: any;
  name: any;
  address: any;
  model: any;
  year: any;
  color: any;
  Pic:any;

  objectData:any;
  constructor(
    private camera: Camera,
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController,
    public provider: BuypindriverService,
    public alert: AlertController
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = "https://parseapi.back4app.com";
  }

  ngOnInit() {
    this.currentUser = Parse.User.current();
    console.log(Parse.User.current().id)
    this.getInfo();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;

      const base64Image = this.picture;
      const name = 'photo.jpeg';

      const parseFile = new Parse.File(name, {
        base64: base64Image
      }); // convierte la foto a base64
      parseFile.save().then((savedFile) => {
        console.log('file saved:' + savedFile);
        this.savedPhoto = savedFile;
        this.currentUser.set('licensePic', savedFile);

        this.currentUser.save().then((result) => {
          console.log(result);
          console.log(" Saved");
        });

        this.provider.photo = savedFile; // foto tomada
      }, (err) => {
        console.log('error grabando file: ' + err);
      });

    },
      (err) => {
        console.log('error de camara' + err);
        alert(err);
      });
  }

  openLibrary() {
    const options: CameraOptions = {
      quality: 25,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true
    };

    const self = this;

    this.camera.getPicture(options).then((imageData) => {
      self.picture = 'data:image/jpeg;base64,' + imageData;
      //self.changeInformation.set('', self.picture);
      const base64Image = self.picture;
      const name = 'photo.jpeg';
      const parseFile = new Parse.File(name, {
        base64: base64Image
      });

      // convierte la foto a base64
      parseFile.save().then((savedFile) => {
        console.log('file saved:' + savedFile);
        console.log('file saved:' + savedFile);
        this.savedPhoto = savedFile;
        this.currentUser.set('licensePic', savedFile);

        this.currentUser.save().then((result) => {
          console.log(result);
          console.log(" Saved");
        });

        this.provider.photo = savedFile; // foto tomada
      

      }, (err) => {
        console.log('error grabando file: ' + err);
        alert(err);
      });
    }, (err) => {
      console.log('error de camara' + err);
      alert(err);
    });
  }



  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/account");
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

  getInfo() {
    Parse.Cloud.run('getCarInfo', {
      userId: Parse.User.current().id
    }).then((result) => {
      console.log(result);
      this.objectData = result;
      this.items = result;
      this.savedPhoto = this.objectData.get('licensePic');
      this.license = this.items.get('license');
      this.expDate = this.items.get('expDate');
      this.name = Parse.User.current().get('fullName');
      this.address = this.items.get('address');
      this.make = this.items.get('make');
      this.model = this.items.get('model');
      this.year = this.items.get('year');
      this.color = this.items.get('color');
    }, (error) => {
      console.log(error);
    });
  }

  setNewData() {


    if(this.savedPhoto == null || this.name == null || this.name == '' || this.address == null || this.address == ''|| this.make == null || this.make == '' || this.model == null || this.model == '' || this.year == null || this.year == '' || this.color == null || this.color =='' || this.license == null || this.license == '' || this.expDate == null || this.expDate == '')
    {
      this.errorInfo();
      return;
    }
    else if(this.savedPhoto != null && this.address != null && this.make != null && this.model != null && this.year != null && this.color != null && this.license != null && this.expDate != null)
    {
      this.objectData.set('licensePic',this.savedPhoto); 
      this.objectData.set('address', this.address);
      this.objectData.set('make', this.make);
      this.objectData.set('model', this.model);
      this.objectData.set('year', this.year);
      this.objectData.set('color', this.color);
      this.objectData.set('license', this.license);
      this.objectData.set('expDate', this.expDate);
  
      this.objectData.save().then(result =>
        {
            console.log(result);
            this.savedInfo();
           
  
        });

    }

  }

  async errorInfo() {
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
    // this.openPage();
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Foto del Vehículo',
      subHeader: '',
      buttons: [
        {
          text: 'Cámara',
          role: 'camara',
          cssClass: 'secondary',
          handler: (blah) => {
            this.openCamera();
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Galería',
          handler: () => {
            this.openLibrary();
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async savedInfo() {
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
    this.openPage();
  }
}
