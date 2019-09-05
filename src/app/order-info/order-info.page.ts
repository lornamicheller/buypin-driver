import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { BuypindriverService } from "../buypindriver.service";
import {Parse} from 'parse';

let parse = require('parse');
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  name:any;
  address:any;
  note:any;

  data:any;
  status:any;
  constructor(public provider: BuypindriverService,private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }

  ngOnInit() {

    this.data =  this.provider.serviceId;
    console.log(this.data);
    //set data

    this.name = this.data.get("user").get("fullName");
    this.address = this.data.get("address").get("city");
    this.note = this.data.get("notes");

    this.status = this.data.get("status");

  }

  inProcess()
  {
      console.log("inProcess");
      //set 
      this.data.set("status", "IP");
      // save
      this.data.save().then(result =>
        {
          this.status = 'IP';
            console.log(result);
            this.ngOnInit();

        });
  }

  finish()
  {
      // console.log(item);

      this.data.set("status", "F");

      this.data.save().then(result => 
        {
            console.log(result);
            this.status = "F";
            this.goBack();
        });

  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/orders");
  }

  seeOrder() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/see-order");
  }

  

}
