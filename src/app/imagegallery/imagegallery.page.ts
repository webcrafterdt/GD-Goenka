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
import { ImagemodalPage } from '../modals/imagemodal/imagemodal.page';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-imagegallery',
  templateUrl: './imagegallery.page.html',
  styleUrls: ['./imagegallery.page.scss'],
})
export class ImagegalleryPage implements OnInit {
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
  ImageForUser: any;
  isLoading = true;
  ImageCategoryID: any;
  ImageSubCategoryID: any;
  ImageCategoryName: any;
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent
  constructor(private toastservice: ToastService, private modalCtrl: ModalController, private assignhomeworkservice: AssignhomeworkService, private router: Router, private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder, private route: ActivatedRoute,) {
    this.TransIds = [];
    this.ImageSubCategoryID = this.route.snapshot.paramMap.get('id');
    this.ImageCategoryName = this.route.snapshot.paramMap.get('id1');


    this.ionicForm = this.formBuilder.group({
      quillData: ['', [Validators.required]]
    })


    //  this.TransIds ='';
  }
  selectedImg: any = null;

  // Is function ko add karein
  // toggleImage(img: any) {
  //   this.selectedImg = img;
  // }

  // closeImage() {
  //   this.selectedImg = null;
  // }




  selectedIndex: number = 0;

  toggleImage(img: any, index: number) {
    this.selectedImg = img;
    this.selectedIndex = index;
  }

  closeImage() {
    this.selectedImg = null;
  }

  nextImage() {
    this.selectedIndex++;

    if (this.selectedIndex >= this.ImageForUser.length) {
      this.selectedIndex = 0;
    }

    this.selectedImg = this.ImageForUser[this.selectedIndex];
  }

  previousImage() {
    this.selectedIndex--;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.ImageForUser.length - 1;
    }

    this.selectedImg = this.ImageForUser[this.selectedIndex];
  }


  ionViewWillEnter() {
    this.TransIds = [];

    this.category = 'applicationlist';
    //this.ionLoaderService.simpleLoader();
    this.assignhomeworkservice.HomeworkClasses().subscribe((res) => {
      console.log('homeworkclasses here -->', res);
      this.status = res['status'];
      this.message = res['HomeWorkClassMessage'];
      this.HomeworkClasses = res['Classes'];
      console.log('this.HomeworkClasses====>', this.HomeworkClasses);

      console.log('this.status====>', this.status);


      this.ionLoaderService.dismissLoader();
    });
    //this.ionLoaderService.dismissLoader();

    this.category = 'applicationlist';
    //this.ionLoaderService.simpleLoader();
    //this.assignhomeworkservice.HomeworkList().subscribe((res) => {
    console.log("ImageSubCategoryID", this.ImageSubCategoryID);
    //this.assignhomeworkservice.ImageSubCategoryForUser(this.ImageSubCategoryID).subscribe((res) => {
    this.assignhomeworkservice.ImageViews(this.ImageSubCategoryID).subscribe((res) => {

      this.isLoading = true;
      console.log("here is images cat for user ->", res);
      this.ImageForUser = res;

      console.log("this.ImageForUser ->", this.ImageForUser);
      //this.ArticleList=res;
      this.ionLoaderService.dismissLoader();
    });
  }

  handleRefresh(event: any) {
    // Direct API call karein taaki hume pata chale data kab aaya
    this.assignhomeworkservice.ImageViews(this.ImageSubCategoryID).subscribe({
      next: (res) => {
        console.log('Image Sub Category List -->', res);
        this.ImageForUser = res;

        // Data milne ke baad refresher ko stop karein
        event.target.complete();
      },
      error: (err) => {
        console.error(err);
        // Agar error aaye tab bhi refresher band hona chahiye
        event.target.complete();
        this.toastservice.presentToast('Failed to refresh Image Sub Category');
      }
    });
  }

  AttachemtnView(imagecatid) {
    console.log("imagecatid-->", imagecatid);
    this.ImageViewModal(imagecatid);
  }

  async ImageViewModal(imagecatid) {
    console.log("afterhomeeee->", imagecatid);
    //this.isLoading = true;
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
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







}
