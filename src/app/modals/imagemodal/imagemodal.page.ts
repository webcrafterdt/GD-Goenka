import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal,ModalController, IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { AssignhomeworkService } from 'src/app/services/assignhomework.service';
@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.page.html',
  styleUrls: ['./imagemodal.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ImagemodalPage implements OnInit {
   homework: any[] = []; // 🔹 yaha aapko data mil jayega
   articleid:any;
   ArticleAttachments:any=[];
   imagecatid:any;
   Images:any;
  constructor(public modalController: ModalController,private navParams: NavParams, private assignhomeworkservice: AssignhomeworkService) { }

  ngOnInit() {
    this.imagecatid= this.navParams.get('imagecatid');
    console.log('this.articleid==>',this.articleid);

    
      this.assignhomeworkservice.ImageViews(this.imagecatid).subscribe((res) => {
        console.log('Image data',res);
        this.Images=res;

        console.log('this.Images -->',this.Images);
         });

  }
  opefile(filename)
  {
      Browser.open({url: filename})
  }
  async closeModel() {
     const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }


  decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  let decoded = txt.value;
  // Remove wrapping <p> tags
  decoded = decoded.replace(/^<p>/i, '').replace(/<\/p>$/i, '');
  return decoded;
}
}




















