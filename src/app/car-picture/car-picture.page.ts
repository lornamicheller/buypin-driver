import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController } from "@ionic/angular";
import { Parse } from 'parse';
import { BuypindriverService } from "../buypindriver.service";
 
let parse = require('parse');
@Component({
  selector: 'app-car-picture',
  templateUrl: './car-picture.page.html',
  styleUrls: ['./car-picture.page.scss'],
})
export class CarPicturePage implements OnInit {

  picture: any;
  // camera:any;
  currentUser:any;
  savedPhoto:any;
  status:any;

  carData:any;

  constructor(
    private camera: Camera,
    private nativePageTransitions: NativePageTransitions, 
    public navigate : NavController, 
    public alert: AlertController,
    public provider: BuypindriverService) { 
      Parse.initialize('C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO', 'EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo');
      Parse.serverURL = 'https://parseapi.back4app.com';
    }

  ngOnInit() {
    this.status = true;
    this.carData = this.provider.carObject;
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

        this.carData.set('carImage',savedFile);

        this.carData.save().then((result)=>
        {
          console.log(result);
          this.status=false;
          console.log(" Saved");
        });

        this.provider.photo  = savedFile; // foto tomada
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

        this.savedPhoto = savedFile;

        this.carData.set('carImage', savedFile);

        this.carData.save().then((result) => {
          this.status=false;
          console.log("Saved");
       
          console.log(result);
        });

      }, (err) => {
        console.log('error grabando file: ' + err);
        alert(err);
      });
    }, (err) => {
      console.log('error de camara' + err);
      alert(err);
    });
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

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/car-register");
  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    // this.provider.plate = object;
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/licence-photo");
  }
}
