import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-about-buypin',
  templateUrl: './about-buypin.page.html',
  styleUrls: ['./about-buypin.page.scss'],
})
export class AboutBuypinPage implements OnInit {

  constructor(private nativePageTransitions: NativePageTransitions,
    public navigate: NavController) { }

  ngOnInit() {
  }

  goBack()
  {
    this.navigate.navigateRoot("/orders");
    
  }


}
