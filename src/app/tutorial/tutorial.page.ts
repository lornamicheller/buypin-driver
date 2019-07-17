import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private nativePageTransitions: NativePageTransitions, public navigate : NavController) { }

  ngOnInit() {
  }

  openPage() {

      let options: NativeTransitionOptions = {
        duration: 300, 
        iosdelay: 300,
        androiddelay: 100,
      }
      console.log(options);
      this.nativePageTransitions.fade(options);
      this.navigate.navigateRoot("/login");
    }
}

