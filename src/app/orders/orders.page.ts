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
  isWorking2: boolean;
  serviceId: any;
  driverId: any;
  id: any;
  services: any;
  items: any;
  status:any;
  stripeVerification:any;
  statusBuyPin:any;

  itemsArray:any;

  user:any;

  client:any; //live query
  subscription:any;

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

    this.setupInit();

    this.setupLiveQuery();
  }

  async setupInit() {

    // try {
    //   let u = await Parse.User.current().fetch();
    //   //fetch success
    //   console.log("fetch user success...");
    // }
    // catch(e) {
    //   console.log("fetch user error... ", e);
    // }

    this.itemsArray = [];
    this.user = Parse.User.current();
    console.log(Parse.User.current());
    this.driverId = Parse.User.current().id;

    this.statusBuyPin = true;



    if(this.toggleValue == true)
    {
      this.status= true;
    }
    else if ( this.toggleValue == false)
    {
      this.status = false;
    }

    console.log("STRIPEEE", this.user.get('stripeConnect'));
  
    if(this.user.get('stripeConnect') == null)
    {
      this.isWorking = false;
      this.emailVerify();
      return;

    }

    if(this.user.get('isApproved') == null || this.user.get('isApproved') == false)
    {
      this.isWorking = false;
      this.process();
      return;
    }
    if(this.user.get('isApproved') == false ||this.user.get('isApproved') == null   || this.user.get('isActivate') == false || this.user.get('isActivate') == null)
    {
      this.isWorking = false;
      this.blockUser();
      return;
    }
     if(this.user.get('stripeConnect') != null &&  this.user.get('isApproved') == true && this.user.get('isActivate') == true)
    {
      this.statusBuyPin = false;
      this.verifyRequest();
      console.log(this.serviceRequestByUsers());
      this.isWorking = Parse.User.current().get("isWorking");
      this.toggleValue = this.isWorking;
      this.isWorking2 = this.isWorking;
      console.log("Todo chill");
      return;
    }
  



    console.log("TOGGLE BUTTON", this.toggleValue);

  }

  setupLiveQuery() {

    this.client = new Parse.LiveQueryClient({
      applicationId: 'C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO',
      serverURL: 'wss://' + 'buypin.back4app.io', // Example: 'wss://livequerytutorial.back4app.io'
      javascriptKey: 'EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo',
      masterKey: '4ZCJxnFPx9nTK4SWDwBq4imO8MOj8e01L9KoDyyO'
    });
    
    this.client.open();

    let query = new Parse.Query('ServiceRequest');
    
    query.equalTo("status", 'R');
    query.include("user");
    query.include("store");
    query.include("address");
    query.include("driverId");
    query.notContainedIn('declineService', [this.user.id]);

    this.subscription = this.client.subscribe(query);

    //events
    this.subscription.on('create', (object) => {
      console.log('object created');
      this.serviceRequestByUsers();
    });

    this.subscription.on('update', (object) => {
      console.log('object updated');
      this.serviceRequestByUsers();
    });

    this.subscription.on('enter', (object) => {
      console.log('object entered');
      this.serviceRequestByUsers();
    });

    this.subscription.on('leave', (object) => {
      console.log('object left');
      this.serviceRequestByUsers();
    });

    this.subscription.on('delete', (object) => {
      console.log('object deleted');
      this.serviceRequestByUsers();
    });

  }

  verifyStatusChange()
  {
    console.log(this.isWorking);

    if(this.isWorking == true)
    {
      console.log("Entrando al if...true");
      this.alertPopup();
      return;
    }
    else if (this.isWorking == false)
    {
      console.log("Entrando al else.... false")
      this.setIsWorkorking(true);
      return;
    }

  }

  async emailVerify(){
    const alert = await this.alert.create({
    header: 'Alert',
    message: 'Presione Aceptar para registrarse en Stripe Connect, llene toda su información bancaria para recibir sus pagos.',
    buttons: [{
    text: 'OK',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {
    // // this.newGroomer = false;
    // this.ngOnInit();
    // this.verifyStripeAccoun();
    // if(this.stripeVerification == null)
    // {
    console.log("Entrando al if Redirect");
    window.open('https://business.buypin.app/#/stripeConnect?id='+ Parse.User.current().id, '_self');
//  window.open('http://business.buypin.app/#/stripeConnect?id='+ Parse.User.current().id, '_system');
    // this.newGroomer = false;
    
 
    // }
    // else if(this.stripeVerification != null)
    // {
    // console.log("done");
    // }
            // this.alertCtrl.dismiss();
    
        }
      }]
    });
    
    await alert.present();
    // const sleep = (milliseconds) => {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }
    // sleep(5000).then(() => {
    //   this.alertCtrl.dismiss();
    //   // this.ngOnInit();
    //   // this.openPage();
    // })
    }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('is working');
  }

  navHistorial()
  {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300,
      androiddelay: 100,
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/terms-condition');
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

  async process() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Gracias por registrarse en Buypin. Estaremos revisando su solicitud y debe esperar a ser aprobado para poder recibir órdenes de clientes.',
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

  async blockUser() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Su cuenta ha sido desactivada. Para más información comuníquese con un representante de Buypin.',
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
      console.log("request tratraatra: ", result);
      this.items = result;
      // console.log(this.items[0].get('address').get('zipcode'));

      this.itemsArray = result;

      // if(this.items != null)
      // {
      //   for(let i =0; i < this.items.length; i ++)
      //   {
      //     console.log("entrando al for");
  
      //     this.filterService(this.items[i]);
      //   }
      
      // }
     

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

        if(items == null || items.get('address') == null ) {
          continue;
        }

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

  async alertLogout() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          handler: async data => {
           
          }
        },
        {
          text: 'Sí',
          handler: async data => {
            this.logOut();
            //await this.toggleIsWorking();
          }
        }
      ]
    });
    await alert.present();
  }


  async alertPopup() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Al desactivar el botón no aparecerás disponible para órdenes.',
      buttons: [
        {
          text: 'Cancelar',
          handler: async data => {
            console.log('Cancel clicked');
            this.isWorking = true;
            this.isWorking2 = true;
            this.toggleValue = this.isWorking;
          }
        },
        {
          text: 'Ok',
          handler: async data => {
            console.log('Saved clicked');
            let value = false;
            await this.setIsWorkorking(value);
            //await this.toggleIsWorking();
          }
        }
      ]
    });
    // el bug ya esta arreglado!
    // if (this.toggleValue === true && this.isWorking == false) { // <------ ya no hay problema ;) 
    //   this.toggleValue = false;
    //   await alert.present();
    //   // ^^^^^^^^^^^^^^^^^^^^^^^^^
    // } else {
    //   this.toggleValue = true;
    //   await this.toggleIsWorking();
    // }

    // console.log("show alert...", this.isWorking);
    // if( this.isWorking2 == true  ) {
      await alert.present();
    // }
    // else {
      // await this.setIsWorkorking(true);
    // }

  }


  verifyStatus()
  {

  }

  async toggleIsWorking() {
    console.log("entered is working", this.isWorking);
    let user = Parse.User.current();
    user.set("isWorking", this.isWorking);

    let res = await user.save();
    console.log("entered is working 1: ", this.isWorking);
    console.log(res);
  }

  async setIsWorkorking(value) {
    console.log("setIsWorkorking set to ", value);
    let user = Parse.User.current();
    user.set("isWorking", value);

    let res = await user.save();
    console.log("entered is working 2: ", this.isWorking);
    console.log(res);

    this.isWorking = value;
    this.isWorking2 = value;
  }

  miVehiculo()
  {
    this.navigate.navigateRoot('/about-buypin');
  }
}

