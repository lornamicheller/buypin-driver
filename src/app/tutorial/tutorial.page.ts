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
          direction: 'left', 
          duration: 200, 
          slowdownfactor: 3, 
          slidePixels: 20, 
          iosdelay: 100,
          androiddelay: 100,
          fixedPixelsTop: 0,
          fixedPixelsBottom: 60
      }
      console.log(options);
      this.nativePageTransitions.slide(options);
      this.navigate.navigateRoot("/login");
    }
}

