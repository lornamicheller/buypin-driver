import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Parse } from 'parse';
import { BuypindriverService } from "../buypindriver.service";
let parse = require('parse');
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {

  constructor(
    private nativePageTransitions: NativePageTransitions, 
    public navigate : NavController, 
    public alert: AlertController,
    public provider: BuypindriverService) {
      Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
      Parse.serverURL = "https://parseapi.back4app.com";
   }

   dailyReport:any;
   weeklyReports:any;
   monthReports:any;
   anualReports:any;

  ngOnInit() {
    // console.log(this.dailyRev);
    this.dailyReports();
    this.weekReports();
    this.monthEarnings();
    this.yearEarnings();
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

    dailyReports()
    {
      Parse.Cloud.run('getDailyEarnings', {
        userId: Parse.User.current().id

      }).then((result) => {
        console.log(result);
        // this.openPage();
        this.dailyReport = result;
        console.log("Daily", this.dailyReport);
      }, (error) => {
        console.log(error);
      });
    }

    weekReports()
    {
      Parse.Cloud.run('getWeeklyEarnings', {
        userId: Parse.User.current().id

      }).then((result) => {
        console.log(result);
        // this.openPage();
        this.weeklyReports = result;
        console.log("Week", this.weeklyReports);
      }, (error) => {
        console.log(error);
      });
    }

    monthEarnings()
    {
      Parse.Cloud.run('getMonthlyEarnigs', {
        userId: Parse.User.current().id

      }).then((result) => {
        console.log(result);
        // this.openPage();
        this.monthReports = result;
        console.log("Month",this.monthReports);
      }, (error) => {
        console.log(error);
      });
    }

    yearEarnings()
    {
      Parse.Cloud.run('getAnualEarnings', {
        userId: Parse.User.current().id

      }).then((result) => {
        console.log(result);
        // this.openPage();
        this.anualReports = result;
        console.log("Anual",this.anualReports);
      }, (error) => {
        console.log(error);
      });
    }

  }


