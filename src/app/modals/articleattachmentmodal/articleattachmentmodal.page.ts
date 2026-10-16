import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal,ModalController, IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { AssignhomeworkService } from 'src/app/services/assignhomework.service';
@Component({
  selector: 'app-articleattachmentmodal',
  templateUrl: './articleattachmentmodal.page.html',
  styleUrls: ['./articleattachmentmodal.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ArticleattachmentmodalPage implements OnInit {
   homework: any[] = []; // 🔹 yaha aapko data mil jayega
   articleid:any;
   ArticleAttachments:any=[];
  constructor(public modalController: ModalController,private navParams: NavParams, private assignhomeworkservice: AssignhomeworkService) { }

  ngOnInit() {
    this.articleid= this.navParams.get('articleid');
    console.log('this.articleid==>',this.articleid);

    
      this.assignhomeworkservice.ArticleAttachment(this.articleid).subscribe((res) => {
        console.log('attachment here',res);
        this.ArticleAttachments=res['ArticleAttachment'];
        console.log('this.ArticleAttachments',this.ArticleAttachments);
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




















