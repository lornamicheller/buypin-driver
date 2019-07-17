import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-see-order',
  templateUrl: './see-order.page.html',
  styleUrls: ['./see-order.page.scss'],
})
export class SeeOrderPage implements OnInit {

  constructor(private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }

  ngOnInit() {
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/order-info");
  }

}
