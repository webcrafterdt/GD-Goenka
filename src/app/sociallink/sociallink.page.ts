import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sociallink',
  templateUrl: './sociallink.page.html',
  styleUrls: ['./sociallink.page.scss'],
})
export class SociallinkPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  // openinsta() {
  //   Browser.open({ url: 'https://www.instagram.com/varun_public_school?igsh=OWlwOWFtaDhndWFr' })
  // }
  openfacebook() {
    Browser.open({ url: 'https://www.facebook.com/100064682173520/photos/1109402217892507/?_rdr' })
  }
  openyoutube() {
    Browser.open({ url: 'https://www.youtube.com/@gdgoenkainternationalschoo7348' })
  }

  goBack() {
    this.navCtrl.back();
  }
}
