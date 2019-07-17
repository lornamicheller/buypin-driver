import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-licence-vehicle',
  templateUrl: './licence-vehicle.page.html',
  styleUrls: ['./licence-vehicle.page.scss'],
})
export class LicenceVehiclePage implements OnInit {

  constructor(private camera: Camera, private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }
  picture: any;

  ngOnInit() {
  }

  // openCamera() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //    }, (err) => {
  //     // Handle error
  //     console.log(options);
  //    });
  // }

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
    this.navigate.navigateRoot("/orders");
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300,
        androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/licence-photo");
  }

}
