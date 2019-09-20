import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Parse } from "parse";
import { BuypindriverService } from "./../../app/buypindriver.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

let parse = require('parse');
@Component({
  selector: 'app-licence-photo',
  templateUrl: './licence-photo.page.html',
  styleUrls: ['./licence-photo.page.scss'],
})
export class LicencePhotoPage implements OnInit {

  savedPhoto:any;
  licensePic:any;
  expDate:any;
  licenseNumber:any;
  currentUser:any;
  currUser:any;
  status:any;

  constructor(public alert: AlertController,private camera: Camera, private nativePageTransitions: NativePageTransitions, public navigate : NavController, public provider: BuypindriverService) { 
    
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }
  picture: any;
  ngOnInit() {
    this.status = true;
    this.currentUser = Parse.User.current();
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
      header: 'Foto Licencia de conducir',
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

openPage() {
  let options: NativeTransitionOptions = {
    duration: 300, 
    iosdelay: 300,
      androiddelay: 100,
  }
  
  console.log(options);
  this.nativePageTransitions.fade(options);
  this.navigate.navigateRoot("/licence-vehicle");
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

addLicenseInfo(){
  
  if(this.savedPhoto == null)
  {
    this.photoError();
    return;
  }

  if(this.expDate == null || this.expDate == '' || this.licenseNumber == null || this.licenseNumber == ''  )
  {
    this.informationError();
    return;
  }
  else if(this.expDate != null && this.expDate != '' && this.licenseNumber != null && this.licenseNumber != '' && this.savedPhoto != null)
  {
    
    this.currUser = Parse.User.current();
    this.currUser.set('driverLicenseNumber', this.licenseNumber);
    this.currUser.set('expDate', this.expDate)
  
   this.currUser.save().then((result)=> {
            console.log(result);
            console.log(" Saved");
            this.openPage();
          }, (error) => {
            this.openPage();
            console.log(error);
          });
        
  }

 
   
}

async informationError() {
  const alert = await this.alert.create({
    header: '¡ALERTA!',
    subHeader: '',
    message:'Todos los campos son requeridos.',
    buttons: [
      {
        text: 'Ok',
        role: 'camara',
        cssClass: 'secondary',
        handler: (blah) => {

          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });
  await alert.present();
}
    
async photoError() {
  const alert = await this.alert.create({
    header: '¡ALERTA!',
    subHeader: '',
    message:'La foto es requerida.',
    buttons: [
      {
        text: 'Ok',
        role: 'camara',
        cssClass: 'secondary',
        handler: (blah) => {

          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });
  await alert.present();
}
    
    

    

}
