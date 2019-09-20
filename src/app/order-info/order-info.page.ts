import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { BuypindriverService } from "../buypindriver.service";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  telefono:any;
  telefonoStore:any;

  watch:any;
  currentLocation:any;

  constructor(private call: CallNumber,public provider: BuypindriverService,private nativePageTransitions: NativePageTransitions, public navigate : NavController, private launchNavigator: LaunchNavigator, private geolocation: Geolocation) { }

 
  ngOnInit() {

    this.data =  this.provider.serviceId;
    console.log(this.data);
    //console.log("user", this.data.get("user"));
    //console.log("phone number: ", this.data.get("user").get("phoneNumber"));
    //set data

    this.name = this.data.get("user").get("fullName");
    this.telefono = this.data.get("user").get("phoneNumber");
    this.telefonoStore = this.data.get("store").get("Phone");
    this.provider.deliveryFee = this.data.get("deliveryFee");

    //this.address = this.data.get("address").get("city");
    this.note = this.data.get("notes");

    this.status = this.data.get("status");


    ////
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.currentLocation = resp.coords;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     this.watch = this.geolocation.watchPosition();
     this.watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.currentLocation = data.coords;
     });

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

  callClientNumber()
  {
    if( this.telefono == null || this.telefono == "" ) {
      return;
    }

    //let testNumber = "7872994006";
    this.call.callNumber(this.telefono+"", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  callStoreNumber()
  {
    if( this.telefonoStore == null || this.telefonoStore == "" ) {
      return;
    }

    this.call.callNumber(this.telefonoStore+"", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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


  seeInMap() {

    
    let store = this.data.get("store");
    let destino = this.data.get("location");

    if( destino != null && store != null && store.get("gps") != null) {
      //destino and store gps pin
      let gps = store.get("gps");
      this.launchNavigator.navigate([destino.latitude, destino.longitude], {
        start: ""+gps.latitude+", "+gps.longitude
      });
    }

    //18.381822, -67.189710, 18.390721, -67.192358
  }


  seeStoreInMap() {

    let store = this.data.get("store");
    let current = this.currentLocation;

    if( current != null && store != null && store.get("gps") != null) {
      //destino and store gps pin
      let gps = store.get("gps");
      this.launchNavigator.navigate([gps.latitude, gps.longitude], {
        start: ""+current.latitude+", "+current.longitude
      });
    }

  }

  

}
