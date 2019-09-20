import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController , AlertController} from "@ionic/angular";
import { ParseError } from '@angular/compiler';
import { BuypindriverService } from "./../../app/buypindriver.service";
import {Parse} from 'parse';
let parse = require ('parse');
@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.page.html',
  styleUrls: ['./edit-driver.page.scss'],
})
export class EditDriverPage implements OnInit {

  constructor(   
    private camera: Camera,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public provider: BuypindriverService,
    public alert: AlertController) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }
  dPic:any;
  expDate:any;
  number:any;
  picture: any;
  // camera:any;
  currentUser:any;
  savedPhoto:any;
  ngOnInit() {
    console.log(this.dPic);
    console.log(this.number);
    console.log(this.expDate);
    this.currentUser = Parse.User.current();
    this.dPic = Parse.User.current().get('driverLicensePicture');
    this.number = Parse.User.current().get('driverLicenseNumber');
    this.expDate = Parse.User.current().get('expDate');
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

        this.currentUser.set('driverLicensePicture',savedFile);

        this.currentUser.save().then((result)=>
        {
          console.log(result);
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

        this.currentUser.set('driverLicensePicture',savedFile);

        this.currentUser.save().then((result)=>
        {
          console.log(result);
          console.log(" Saved");
        });

        this.provider.photo  = savedFile; // foto tomada
      

      }, (err) => {
        console.log('error grabando file: ' + err);
        alert(err);
      });
    }, (err) => {
      console.log('error de camara' + err);
      alert(err);
    });
  }


// openPage() {
//   let options: NativeTransitionOptions = {
//     duration: 300, 
//     iosdelay: 300,
//       androiddelay: 100,
//   }
//   console.log(options);
//   this.nativePageTransitions.fade(options);
//   this.navigate.navigateRoot("/account");
// }

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



setNewData(){
  console.log("Save Change");
 
  if(this.dPic == null || this.number == null || this.number == '' || this.expDate == null )
  {
    this.errorInput();
    return;

  }
  else if (this.dPic != null && this.number != null &&  this.expDate != null )
  {
    Parse.User.current().set('driverLicensePicture', this.dPic);
    Parse.User.current().set('driverLicenseNumber', this.number);
    Parse.User.current().set('expDate', this.expDate);
    
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

  async errorInput(){
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


}

