import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AssignhomeworkService } from 'src/app/services/assignhomework.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { NewsmodalPage } from '../modals/newsmodal/newsmodal.page';
import { ModalController } from '@ionic/angular';
import { HomeworkviewmodalPage } from '../modals/homeworkviewmodal/homeworkviewmodal.page';
import { ArticleattachmentmodalPage } from '../modals/articleattachmentmodal/articleattachmentmodal.page';
import { AddimagemodalPage } from '../modals/addimagemodal/addimagemodal.module';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-imagesubcat',
  templateUrl: './imagesubcat.page.html',
  styleUrls: ['./imagesubcat.page.scss'],
})
export class ImagesubcatPage implements OnInit {
  category: any;
  fromdate: any;
  todate: any;
  dateParts: any;
  dateParts_to: any;
  status: any;
  message: any;
  applied_leaves: any = [];
  public title = '';
  public reason = '';
  ionicForm: FormGroup;
  HomeworkClasses: any = [];
  TransIds: any = [];
  homeworklist: any = [];
  quillData: string;
  SelectedClassName: any;
  SelectedClassName1: any;
  SelectedClassName2: any;
  NewsSubject: any = [];
  LinktoImageGallery: any = [];
  subCaArrarData: any = [];
  newstype: any;
  newsContent: any;
  imgcatid: any;
  ImgSubCat: any;
  datepost: any;
  selectedFileNames: any = [];
  base64DataArray: any = [];
  descriptions: any = [];
  orientations: any = [];
  NewsList: any = [];
  ArticleSubjects: any = [];
  ArticleAuth: any = [];
  public_checked: any;
  asubid: any;
  article_send_to: any;
  articleContent: any;
  ArticleList: any = [];
  public_checked_display: any;
  ShowType: any;
  category1: any;
  subcategory: any;
  imagecatid: any;
  ImageCategories: any = [];
  isLoading = true;
  ImageCategoryID: any;
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent
  constructor(private toastservice: ToastService, private route: ActivatedRoute, private modalCtrl: ModalController, private assignhomeworkservice: AssignhomeworkService, private router: Router, private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder) {
    this.TransIds = [];

    this.ImageCategoryID = this.route.snapshot.paramMap.get('id');

    this.ionicForm = this.formBuilder.group({
      quillData: ['', [Validators.required]]
    })



    this.assignhomeworkservice.getsubcategory(this.ImageCategoryID).subscribe((res2) => {
      this.subCaArrarData = res2['ImagesubcatArrayData'];
      console.log("this.subCaArrarData-->", this.subCaArrarData);
    })

    //  this.TransIds ='';
  }


  OpenImage(subcatid, subcatname) {
    this.router.navigate(['/imagegallery', subcatid, subcatname])
  }
  editHomework(id) {
    this.router.navigate(['/formhomeworkedit', id])
    //this.router.navigate(['/homeworksubjects',JSON.stringify(id)]);
  }

  deleteHomework(homeworkid) {
    this.assignhomeworkservice.DeleteHomework(homeworkid).subscribe((res) => {
      console.log('Delet3e homweworlk homeworkclasses here -->', res);
      this.toastservice.presentToast('HomeWork Deleted Successfully ..!! ');
      this.ngOnInit();
      this.ionViewWillEnter();
    });
  }




  ionViewWillEnter() {
    this.TransIds = [];

    this.category = 'applicationlist';
    //this.ionLoaderService.simpleLoader();
    this.assignhomeworkservice.get_categories().subscribe((res) => {
      this.isLoading = true;
      console.log('catlist here -->', res);
      this.ImageCategories = res;

    });
    //this.ionLoaderService.dismissLoader();

    this.category = 'applicationlist';
    //this.ionLoaderService.simpleLoader();
    //this.assignhomeworkservice.HomeworkList().subscribe((res) => {
    this.assignhomeworkservice.ArticleList().subscribe((res) => {

      console.log('article List list -->', res);
      this.ArticleList = res;

      console.log('this.ArticleList -->', this.ArticleList);

      // this.status = res['status'];
      // this.homeworklist=res['data'];




      this.ionLoaderService.dismissLoader();
    });
  }

  ShowHideCatSubCat(ShowType) {
    console.log("here is showtype", ShowType);
    this.ShowType = ShowType;
    console.log("here is this.ShowType", this.ShowType);
  }
  authorizeArticle(articleid) {
    this.assignhomeworkservice.AuthorizeArticle(articleid).subscribe((res) => {
      console.log('Article Authorize -->', res);
      this.toastservice.presentToast('Article Authorized Successfully ..!! ');
      this.ngOnInit();
      this.ionViewWillEnter();
    });
  }

  deleteArticle(articleid) {
    this.assignhomeworkservice.Deletearticle(articleid).subscribe((res) => {
      this.toastservice.presentToast('Article removed Successfully ..!! ');
      this.ngOnInit();
      this.ionViewWillEnter();
    });
  }


  AttachemtnView(imagecatid) {
    console.log("imagecatid-->", imagecatid);
    this.HomeWorkViewModal(imagecatid);
  }

  async HomeWorkViewModal(imagecatid) {
    console.log("afterhomeeee->", imagecatid);
    //this.isLoading = true;
    const modal = await this.modalCtrl.create({
      component: AddimagemodalPage,
      cssClass: 'half-screen-modal',
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
      componentProps: {   // 🔹 yaha data pass hoga
        imagecatid: imagecatid
      }
    });

    return await modal.present();
  }

  // homeworkdetailscalender(tid: string) {
  //   this.filteredHomework = this.HomeWorkdata.filter(hw => hw.tid === tid);
  //   console.log("this.filteredHomework ---->",this.filteredHomework);
  //   if (this.filteredHomework.length > 0) {
  //     this.ismodalmanuallyclosed =true;
  //    // this.isModalOpen = true; // Modal open hoga sirf agar data hai
  //     this.HomeWorkViewModal(this.filteredHomework);

  //   } else {
  //     // Agar modal open na karna ho aur sirf message dikhana ho
  //     // this.isModalOpen = false;
  //     alert('No homework available for this staff'); 
  //   }
  // }



  is_attachment_added(event: any) {
    console.log('Checked value:', event.detail.checked);
    if (event.detail.checked == true) {
      this.NewsAttachmentModal('', '', '');
    }
  }


  async NewsAttachmentModal(StudentData, LegendArray, Attendance_Data) {

    const modal = await this.modalCtrl.create({
      component: NewsmodalPage,
      cssClass: 'half-screen-modal',
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
      componentProps: {
        StudentData: StudentData,
        LegendArray: LegendArray,
        Attendance_Data: Attendance_Data
      }
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.selectedFileNames = res.data.fileNames;
        this.base64DataArray = res.data.base64Files;
        this.descriptions = res.data.descriptions;
        this.orientations = res.data.orientations;

        // ✅ YAHI log karo
        console.log('Received fileNames:', this.selectedFileNames);
        console.log('Received base64Files:', this.base64DataArray);
        console.log('Received orientations:', this.orientations);
        console.log('Received descriptions:', this.descriptions);


      }
    });

    await modal.present();
  }




  getsubcatid(event: any) {
    console.log("here is iddd =>", event.detail.value);
    const imagecatid = event.detail.value;
    this.assignhomeworkservice.getsubcategory(imagecatid).subscribe((res2) => {
      this.subCaArrarData = res2['ImagesubcatArrayData'];
      console.log("this.subCaArrarData-->", this.subCaArrarData);
    })
  }

  onContentChanged = (event) => {
    console.log('event=====>', event);

    if (event.html) {
      // Do whatever you want here
      console.log('The content has changed', event.html);
      this.articleContent = event.html;


    }
  }
  to_date(todate) {

    let CompDate = todate.substring(0, 10).split("-");
    this.datepost = CompDate[0] + '-' + CompDate[1] + '-' + CompDate[2];
    console.log('this.CompletionDate====>', this.datepost);
    //this.todate = this.changeDateFormat_to(todate);

  }

  is_checked_public(event: any) {
    console.log('is public checked:', event.detail.checked);
    this.public_checked = event.detail.checked;
    console.log('is this.public_checked:', this.public_checked);
  }


  SubmitCat() {
    console.log("this.category1-->", this.category1);
    if (!this.category1) {
      this.toastservice.presentToast('Please Enter Category');
      return false;
    }

    this.assignhomeworkservice.image_manager_cat_save(this.category1).subscribe((res) => {
      console.log("res here ->", res);
      this.toastservice.presentToast(res);
      this.category1 = '';
      this.ionViewWillEnter();
      this.category = 'writeapplication';

    })
  }


  SubmitSubCat() {
    console.log("this.subcategory-->", this.subcategory);
    if (!this.subcategory) {
      this.toastservice.presentToast('Please Enter Sub Category');
      return false;
    }

    if (!this.imagecatid) {
      this.toastservice.presentToast('Please Select Category');
      return false;
    }

    this.assignhomeworkservice.image_manager_sub_cat_save(this.subcategory, this.imagecatid).subscribe((res) => {
      console.log("res here ->", res);
      this.toastservice.presentToast(res);
    })
  }


  submitarticle() {
    console.log("datepost---->", this.datepost);
    console.log("title-->", this.title);
    if (!this.title) {
      this.toastservice.presentToast('Please Enter Title');
      return false;
    }
    if (!this.asubid) {
      this.toastservice.presentToast("Please Select Subject")
    }
    if (!this.article_send_to) {
      this.toastservice.presentToast("Please Select Authorization")
    }
    if (this.public_checked == true) {
      this.public_checked_display = 'Y';
    }
    else {
      this.public_checked_display = 'N';
    }

    console.log("this.public_checked_display-->", this.public_checked_display);

    this.assignhomeworkservice.article_manager_save(this.title, this.asubid, this.article_send_to, this.public_checked_display, this.articleContent, this.base64DataArray, this.descriptions, this.orientations).subscribe((res) => {
      console.log("here is save news-->", res);
      this.toastservice.presentToast("Record Inserted Successfully")
    })
  }

  ngOnInit() {

    console.log("xcxcxcxc");

    this.assignhomeworkservice.ArticleDropdowns().subscribe((res1) => {
      console.log('res1 => ', res1);
      this.ArticleSubjects = res1['ArticleSubjects'];
      this.ArticleAuth = res1['ArticleAuth'];

      console.log('this.ArticleSubjects res1 =>', this.ArticleSubjects);
      console.log('this.ArticleAuth res1 =>', this.ArticleAuth);
    })





    this.TransIds = [];

    this.ionicForm = this.formBuilder.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      reason: ['', [Validators.required]]

    })
  }

  decodeHtml(html: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }


  gettransids(transids) {

    const index = this.TransIds.indexOf(transids);
    if (index !== -1) {
      this.TransIds.splice(index, 1);
    }
    else {
      this.TransIds.push(transids);
    }
    console.log('this.TransIds ==>', this.TransIds);
  }




  ProceedToSubject() {
    let id = this.TransIds;
    console.log('id trans =', id);
    console.log('id trans length =', id.length);
    if (id.length > 0) {
      this.router.navigate(['/homeworksubjects', JSON.stringify(id)]);
    }
    else {
      this.toastservice.presentToast('Please Select Class ..!! ');
    }

    //this.router.navigate(["/teachsecfees",id,id1]);
  }
}
