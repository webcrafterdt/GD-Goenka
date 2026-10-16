import { Component, OnInit } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { NavParams, Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { AssignhomeworkService } from 'src/app/services/assignhomework.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-addimagemodal',
  templateUrl: './addimagemodal.page.html',
  styleUrls: ['./addimagemodal.page.scss'],
  standalone: true,              // 👈 YAHAN

})
export class AddimagemodalPage implements OnInit {
  homework: any[] = []; // 🔹 yaha aapko data mil jayega
  articleid: any;
  ArticleAttachments: any = [];
  selectedFileNames: any;
  base64DataArray: any;
  ionicForm: FormGroup;
  allowedFileTypes: any = [];
  datepost: any;
  imagecatid: any;
  ImageSubCatId: any = [];
  title1: any;
  imagesubcatid: any;
  des: any;
  //orientations:any;
  orientations: string = 'Y';
  isAutoAdjust: boolean = true; // Default off rahega
  constructor(private zone: NgZone, public formBuilder: FormBuilder, private toastservice: ToastService, public modalController: ModalController, private cdr: ChangeDetectorRef, private platform: Platform, private navParams: NavParams, private assignhomeworkservice: AssignhomeworkService) {

    this.ionicForm = this.formBuilder.group({
      quillData: ['', [Validators.required]]
    })

  }

  ngOnInit() {
    //this.articleid= this.navParams.get('articleid');
    this.imagecatid = this.navParams.get('imagecatid');

    console.log('this.imagecatid==>', this.imagecatid);


    // this.assignhomeworkservice.ArticleAttachment(this.articleid).subscribe((res) => {
    //   console.log('attachment here',res);
    //   this.ArticleAttachments=res['ArticleAttachment'];
    //   console.log('this.ArticleAttachments',this.ArticleAttachments);
    //    });

    this.assignhomeworkservice.getImagesubcategory(this.imagecatid).subscribe((res) => {
      console.log('Image Sub Categories', res);
      this.ImageSubCatId = res;
    });



  }

  triggerPdfInput(index: number) {
    console.log("xcxcxcxcxc  ssss", index);
    // this.attachmentUploadLocationArray=attachment_upload_location;
    // console.log('this.attachmentUploadLocationArray',this.attachmentUploadLocationArray);
    //    const pdfInput = document.getElementById(`pdfInput${index}_${fileIndex}`) as HTMLInputElement;
    const pdfInput = document.getElementById(`pdfInput`) as HTMLInputElement;
    console.log("pdfInput->", pdfInput);
    if (pdfInput) {
      pdfInput.value = ''; // Clear the input value
      pdfInput.click(); // Trigger the file input click
    }
  }
  async onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.allowedFileTypes = [
      // 'text/plain',
      // 'application/pdf',
      // 'application/msword',
      // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/bmp',
      'image/gif'
    ];

    // init arrays (important)
    if (!this.selectedFileNames) this.selectedFileNames = [];
    if (!this.base64DataArray) this.base64DataArray = [];

    for (let i = 0; i < input.files.length; i++) {

      // if (this.selectedFileNames.length >= 3) {
      //   alert('Maximum 3 files allowed');
      //   break;
      // }

      const file = input.files[i];

      /* ===== TYPE CHECK ===== */
      if (!this.allowedFileTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}`);
        continue;
      }

      /* ===== SIZE CHECK (5MB) ===== */
      if (file.size > 5242880) {
        alert(`File too large (max 5MB): ${file.name}`);
        continue;
      }

      /* ===== PUSH FILE NAME ===== */
      this.zone.run(() => {
        // this.selectedFileNames.push(file.name);
        this.selectedFileNames = file.name;
      });

      /* ===== BASE64 ===== */
      const base64Data = await this.convertToBase64(file);
      //this.base64DataArray.push(base64Data);
      this.base64DataArray = base64Data;

      /* ===== OPTIONAL LOCAL SAVE ===== */
      const directory = this.platform.is('android')
        ? Directory.External
        : Directory.Documents;

      await Filesystem.writeFile({
        path: file.name,
        data: base64Data,
        directory
      });
    }

    console.log('Names Array:', this.selectedFileNames);
    console.log('Base64 Array:', this.base64DataArray);


    // if (this.selectedFileNames.length > 3) {
    //       alert('Maximum 3 files allowed');
    //       return false;
    //     }

    this.cdr.detectChanges();
    input.value = '';

  }
  to_date(todate) {

    let CompDate = todate.substring(0, 10).split("-");
    this.datepost = CompDate[0] + '-' + CompDate[1] + '-' + CompDate[2];
    console.log('this.CompletionDate====>', this.datepost);
    //this.todate = this.changeDateFormat_to(todate);

  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve((reader.result as string).split(',')[1]);
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }
  opefile(filename) {
    Browser.open({ url: filename })
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

  //  this.assignhomeworkservice.getImagesubcategory(this.imagecatid).subscribe((res) => {
  //     console.log('Image Sub Categories',res);
  //     this.ImageSubCatId=res;
  //      });
  //toast 
  SubmitImage() {
    console.log("this.title1", this.title1);
    console.log("this.imagesubcatid", this.imagesubcatid);
    console.log("this.datepost", this.datepost);
    console.log("this.des", this.des);
    console.log("this.orientations", this.orientations);

    if (!this.title1) {
      this.toastservice.presentToast("Please Enter Title");
      return false;
    }


    if (!this.imagesubcatid) {
      this.toastservice.presentToast("Please Select Sub Category");
      return false;
    }


    if (!this.base64DataArray) {
      this.toastservice.presentToast("Please Select Image");
      return false;
    }


    this.assignhomeworkservice.Image_Save(this.title1, this.imagesubcatid, this.datepost, this.des, this.orientations, this.base64DataArray, this.isAutoAdjust).subscribe((res) => {
      console.log("Image Save response -->", res);
      this.toastservice.presentToast(res);
      this.modalController.dismiss({
        success: true
      });
    })
  }


}

