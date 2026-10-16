import { Component, OnInit } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import karein

@Component({
  selector: 'app-studycontentmodal',
  templateUrl: './studycontentmodal.page.html',
  styleUrls: ['./studycontentmodal.page.scss'],
})
export class StudycontentmodalPage implements OnInit {
  contentdetail: any;
  constructor(public modalController: ModalController, private navParams: NavParams, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.contentdetail = this.navParams.get('value');
    console.log('this.contentdetail==>', this.contentdetail);
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
