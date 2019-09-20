import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage implements OnInit {

  constructor(private nativePageTransitions: NativePageTransitions,
    public navigate: NavController,) { }

  ngOnInit() {
  }

  goBack()
  {
    this.navigate.navigateRoot("/orders");
    
  }

}
