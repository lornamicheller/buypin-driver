import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-licence-photo',
  templateUrl: './licence-photo.page.html',
  styleUrls: ['./licence-photo.page.scss'],
})
export class LicencePhotoPage implements OnInit {

  constructor(private camera: Camera, private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }
  picture: any;
  ngOnInit() {
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.picture = 'data:image/jpeg;base64,' + imageData;

      let base64Image = this.picture;
      let name = "photo.jpeg";

    }, 
 (err)=> {
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
}
