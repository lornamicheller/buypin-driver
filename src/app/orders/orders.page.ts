import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";
import { Parse } from 'parse';
import { BuypindriverService } from "../buypindriver.service";
import { runInThisContext } from 'vm';

const parse = require('parse');

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  toggleValue: boolean;
  isWorking: boolean;
  serviceId: any;
  driverId: any;
  id: any;
  services: any;
  items: any;
  status:any;

  itemsArray:any;

  user:any;

  constructor(
    public alert: AlertController,
    public provider: BuypindriverService,
    public menu: MenuController,
    private nativePageTransitions: NativePageTransitions,
    public navigate: NavController
  ) {
    Parse.initialize('C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO', 'EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo');
    Parse.serverURL = 'https://parseapi.back4app.com';
  }

  ngOnInit() {
    this.itemsArray = [];
    this.user = Parse.User.current();
    console.log(Parse.User.current());
    this.driverId = Parse.User.current().id;
    this.verifyRequest();
    console.log(this.serviceRequestByUsers());
    this.isWorking = Parse.User.current().get("isWorking");
    this.toggleValue = this.isWorking;

    if(this.toggleValue == true)
    {
      this.status= true;
    }
    else if ( this.toggleValue == false)
    {
      this.status = false;
    }

    console.log("TOGGLE BUTTON", this.toggleValue);
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('is working');
  }

  openPage() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/order-info');
  }

  async serviceCheck() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Usted tiene un servicio en proceso. Debe culminar el servicio antes de realizar algún otro.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          this.navigate.navigateRoot('/order-info');
        }
      }]
    });
    await alert.present();
  }

  openAccountPage() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/account');
  }

  stayHome() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/orders');
  }

  verifyRequest() {
    Parse.Cloud.run('verifyServiceRequest', {
      driverId: Parse.User.current().id
    }).then((result) => {
      console.log(result);

      if (result == null) {
        console.log("Puede hacer servicio");

      }
      else if (result != null) {
        this.serviceCheck();
        this.provider.serviceId = result;
      }
    }, (error) => {
      console.log(error);
    });
  }

  openEarnings() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/earnings');
  }

  logoutTransition() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/login');
  }

  acceptRequest(item) {

    //   Parse.Cloud.run('acceptService', {
    //       serviceID:this.serviceId,
    //       driverId: this.driverId
    //   }). then ((result) => {
    //     console.log(result);
    //     this.openPage();
    //   }, (error) => {
    //       console.log(error);
    //  }); 
    console.log(item);


    this.provider.serviceId = item;
    // this.openPage();

    item.set("status", "A");
    item.set("driverId", Parse.Object.extend("_User").createWithoutData(Parse.User.current().id).toPointer());

    item.save().then(result => {
      console.log("Aceptado");
      this.openPage();
    });

    console.log(item);

  }

  decline(serviceId) {  //this.consoleAlert();
    Parse.Cloud.run("declineService", { serviceId: serviceId, userId: Parse.User.current().id }).then((result) => {
      console.log(result);
      this.ngOnInit();
    },
      (error) => {
        console.log(error);
      });
    // Parse.Cloud.run("declineService",
    // { serviceId: serviceId.id, 
    //   userId: Parse.User.current().id
    // }).then((result)=> {
    //   console.log(result);
    //   // this.items = result;
    // }, (error)=>{
    //   console.log(error)
    // });
    //   this.ngOnInit();
  }

  serviceRequestByUsers() {
    Parse.Cloud.run("getMyServiceRequests", {
      userId: Parse.User.current().id,
    }).then((result) => {
      console.log(result);
      this.items = result;
      console.log(this.items[0].get('address').get('zipcode'));
      for(let i =0; i < this.items.length; i ++)
      {
        console.log("entrando al for");


        this.filterService(this.items[i]);
      }
    

    }, (error) => {
      console.log(error)
    });
  }

  filterService(items)
  {
    console.log("filter service");
    console.log("items", items);
    let zipcodes = this.user.get('workZipCode');
    console.log("ZipCode", zipcodes);
    console.log(zipcodes.length);
      for(let i =0; i < zipcodes.length ; i ++)
      {
        console.log("zipcode2", zipcodes[i]);
        console.log("items2", items.get('address').get('zipcode') );
          if(zipcodes[i] == items.get('address').get('zipcode'))
          {
            console.log("Es el mismo");
            this.itemsArray.push(items);
            console.log(this.itemsArray);
            return;
          }

      }

     
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
      this.logoutTransition();
    }, err => {
      console.log('Error logging out', err);
    });
  }

  async alertPopup() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Al desactivar el botón no aparecerás disponible para recibir servicios',
      buttons: [
        {
          text: 'Cancelar',
          handler: async data => {
            console.log('Cancel clicked');
            this.isWorking = true;
            this.toggleValue = this.isWorking;
          }
        },
        {
          text: 'Ok',
          handler: async data => {
            console.log('Saved clicked');
            await this.toggleIsWorking();
          }
        }
      ]
    });
    // el bug ya esta arreglado!
    if (this.toggleValue === true && this.isWorking == false) { // <------ ya no hay problema ;) 
      this.toggleValue = false;
      await alert.present();
      // ^^^^^^^^^^^^^^^^^^^^^^^^^
    } else {
      this.toggleValue = true;
      await this.toggleIsWorking();
    }
  }


  verifyStatus()
  {

  }

  async toggleIsWorking() {
    console.log("entered is working");
    let user = Parse.User.current();
    user.set("isWorking", this.isWorking);

    let res = await user.save();
    console.log(res);
  }
}

