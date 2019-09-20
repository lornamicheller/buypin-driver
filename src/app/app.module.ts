import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx'
//import { LaunchNavigator } from '@ionic-native/launch-navigator'; 
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { BuyPinServices } from './buypindriver.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAh2R_p9Wp8U0Zp2xL9Q_ofbJXiuRxG1YQ",
  authDomain: "buypin-9290a.firebaseapp.com",
  databaseURL: "https://buypin-9290a.firebaseio.com",
  projectId: "buypin-9290a",
  storageBucket: "",
  messagingSenderId: "278961860879",
  appId: "1:278961860879:web:59061d7c16b5a1d3714e7a"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    Camera,
    CallNumber,
    LaunchNavigator,
    Geolocation,
    Firebase,
    
   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
