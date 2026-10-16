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
@Component({
  selector: 'app-newsforuser',
  templateUrl: './newsforuser.page.html',
  styleUrls: ['./newsforuser.page.scss'],
})
export class NewsforuserPage implements OnInit {
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
  isLoading = true;
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent
  constructor(private toastservice: ToastService, private modalCtrl: ModalController, private assignhomeworkservice: AssignhomeworkService, private router: Router, private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder) {
    this.TransIds = [];


    this.ionicForm = this.formBuilder.group({
      quillData: ['', [Validators.required]]
    })


    //  this.TransIds ='';
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
  // newsforuser.page.ts



  handleRefresh(event: any) {
    // Direct API call karein taaki hume pata chale data kab aaya
    this.assignhomeworkservice.NewsList().subscribe({
      next: (res) => {
        console.log('Refresh News List -->', res);
        this.NewsList = res;

        // Data milne ke baad refresher ko stop karein
        event.target.complete();
      },
      error: (err) => {
        console.error(err);
        // Agar error aaye tab bhi refresher band hona chahiye
        event.target.complete();
        this.toastservice.presentToast('Failed to refresh news');
      }
    });
  }
  ionViewWillEnter() {
    this.TransIds = [];

    this.category = 'applicationlist';
    //this.ionLoaderService.simpleLoader();
    this.assignhomeworkservice.HomeworkClasses().subscribe((res) => {
      this.isLoading = true;
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
    this.assignhomeworkservice.NewsList().subscribe((res) => {

      console.log('News List list -->', res);
      this.NewsList = res;

      console.log('this.NewsList -->', this.NewsList);

      // this.status = res['status'];
      // this.homeworklist=res['data'];




      this.ionLoaderService.dismissLoader();
    });
  }



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
      this.newsContent = event.html;

    }
  }
  to_date(todate) {

    let CompDate = todate.substring(0, 10).split("-");
    this.datepost = CompDate[0] + '-' + CompDate[1] + '-' + CompDate[2];
    console.log('this.CompletionDate====>', this.datepost);
    //this.todate = this.changeDateFormat_to(todate);

  }
  submitnews() {
    console.log("datepost---->", this.datepost);
    // return false;
    console.log("title-->", this.title);
    if (!this.title) {
      this.toastservice.presentToast('Please Enter Title');
      return false;
    }
    if (!this.newstype) {
      this.toastservice.presentToast("Please Select News Type")
    }


    this.assignhomeworkservice.savenews(this.title, this.newstype, this.imgcatid, this.ImgSubCat, this.newsContent, this.datepost, this.base64DataArray, this.descriptions, this.orientations).subscribe((res) => {
      console.log("here is save news-->", res);
      this.toastservice.presentToast("Record Inserted Successfully")
    })
  }

  ngOnInit() {

    console.log("xcxcxcxc");

    this.assignhomeworkservice.NewsDropdowns().subscribe((res1) => {
      console.log('res1 => ', res1);
      this.NewsSubject = res1['TopicArrayData'];
      this.LinktoImageGallery = res1['ImagecatArrayData'];

      console.log('this.NewsSubject res1 =>', this.NewsSubject);
      console.log('this.LinktoImageGallery res1 =>', this.LinktoImageGallery);
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
