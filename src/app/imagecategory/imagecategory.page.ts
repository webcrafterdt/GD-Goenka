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
@Component({
  selector: 'app-imagecategory',
  templateUrl: './imagecategory.page.html',
  styleUrls: ['./imagecategory.page.scss'],
})
export class ImagecategoryPage implements OnInit {
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


  SessionList: any[] = [];
  CategoryList: any[] = [];
  selectedSession: any;
  selectedCategory: any;
  ImageCategoryForUser: any = [];
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent
  constructor(private toastservice: ToastService, private modalCtrl: ModalController, private assignhomeworkservice: AssignhomeworkService, private router: Router, private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder) {
    this.TransIds = [];


    this.ionicForm = this.formBuilder.group({
      quillData: ['', [Validators.required]]
    })


    //  this.TransIds ='';
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
    this.assignhomeworkservice.ImageCategoryList().subscribe((res) => {
      this.isLoading = true;
      console.log("here is images cat for user ->", res);
      this.ImageCategoryForUser = res;

      console.log("this.ImageForUser ->", this.ImageForUser);
      //this.ArticleList=res;
      this.ionLoaderService.dismissLoader();
    });
    this.loadSessions();
  }


  loadSessions() {
    this.assignhomeworkservice.getSessionList().subscribe((res: any) => {
      this.SessionList = res;
      console.log('Session List -->', this.SessionList);
    });
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.getGridData();
      //ImageCategoryForUser
    }
  }


  // getGridData() {
  //   this.isLoading = true;

  //   // Dono parameters pass kar rahe hain
  //   this.assignhomeworkservice.ImageCategoryList(this.selectedSession, this.selectedCategory)
  //     .subscribe((res: any) => {
  //       this.ImageCategoryForUser = res; // Grid update hoga
  //       console.log('Filtered Image Category List -->', this.ImageCategoryForUser);
  //       this.isLoading = false;
  //     }, (error) => {
  //       this.isLoading = false;
  //       console.error("Error:", error);
  //     });
  // }
  getGridData() {
    // this.ionLoaderService.simpleLoader();


    this.assignhomeworkservice.ImageCategoryList(this.selectedSession, this.selectedCategory)
      .subscribe({
        next: (res: any) => {
          // 1. Array ko update karein
          this.ImageCategoryForUser = []; // Pehle khali karein
          setTimeout(() => {
            this.ImageCategoryForUser = res; // Naya data assign karein
          }, 50);

          this.ionLoaderService.dismissLoader();
          console.log("Response Data -->", res);
        },
        error: (err) => {
          this.ionLoaderService.dismissLoader();
          console.error(err);
        }
      });
  }

  // 2. Jab Session change ho, tab Categories fetch karein
  onSessionChange() {
    this.CategoryList = []; // Purani list clear karein
    this.selectedCategory = null;

    if (this.selectedSession === '0') {
      // "All" ke case mein category reset karke turant data load karein
      this.selectedCategory = '0';
      this.getGridData();
    }
    else {
      if (this.selectedSession) {
        this.assignhomeworkservice.getCategoriesBySession(this.selectedSession).subscribe((res: any) => {
          this.CategoryList = res;
          console.log('Categories for this.CategoryList -->', this.CategoryList);
        });
      }
    }

  }



  handleRefresh(event: any) {
    // Direct API call karein taaki hume pata chale data kab aaya
    this.assignhomeworkservice.ImageCategoryList().subscribe({
      next: (res) => {
        console.log('Image Category List -->', res);
        this.ImageCategoryForUser = res;

        // Data milne ke baad refresher ko stop karein
        event.target.complete();
      },
      error: (err) => {
        console.error(err);
        // Agar error aaye tab bhi refresher band hona chahiye
        event.target.complete();
        this.toastservice.presentToast('Failed to refresh Image Category');
      }
    });
  }

  AttachemtnView(imagecatid, CategoryName) {
    console.log("imagecatid-->", imagecatid);
    console.log("CategoryName-->", CategoryName);
    //  this.ImageViewModal(imagecatid);
    //this.router.navigate(["/imageforuser"/imagecatid]);
    this.router.navigate(['/imageforuser', imagecatid, CategoryName]);
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
