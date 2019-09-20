import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { BuypindriverService } from "../buypindriver.service";

@Component({
  selector: 'app-see-order',
  templateUrl: './see-order.page.html',
  styleUrls: ['./see-order.page.scss'],
})
export class SeeOrderPage implements OnInit {

  constructor(public provider: BuypindriverService,private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }

  items:any;
  date:any;
  total:any;

  ngOnInit() {
    this.items = [];
    this.items = this.provider.serviceId.get("items");

    this.date = this.provider.serviceId.get("date");

    this.total = this.provider.deliveryFee;
    

    console.log(this.items);

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
