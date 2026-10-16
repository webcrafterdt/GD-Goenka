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
  selector: 'app-newsmanager',
  templateUrl: './newsmanager.page.html',
  styleUrls: ['./newsmanager.page.scss'],
})
export class NewsmanagerPage implements OnInit {
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
  isSubmitting: boolean = false; // Point 19 fix: prevents duplicate/extra-tap submits

  // ------------------------------------------------------------------
  // Infinite scroll state for News List: load 5 latest items first,
  // then load 5 more each time the user scrolls to the bottom.
  // ------------------------------------------------------------------
  newsOffset: number = 0;      // how many news items already loaded
  newsPageSize: number = 5;    // items per page
  newsAllLoaded: boolean = false; // true once server returns < pageSize (nothing more to load)

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

    // Reset pagination every time this page is (re)entered, so we
    // always start fresh with the latest 5 items, not append onto
    // whatever was loaded during a previous visit.
    this.NewsList = [];
    this.newsOffset = 0;
    this.newsAllLoaded = false;
    this.loadNews();
  }

  // Loads one page of news (newsPageSize items) starting at
  // newsOffset, and appends it to NewsList. Pass the infinite-scroll
  // event so we can call event.target.complete()/disabled once done.
  loadNews(event?: any) {
    if (this.newsAllLoaded) {
      if (event) { event.target.complete(); }
      return;
    }

    this.assignhomeworkservice.NewsList(this.newsOffset, this.newsPageSize).subscribe((res) => {

      console.log('News List raw response -->', res, typeof res);

      // Defensive parsing: sometimes the server response comes back
      // as a JSON string instead of an already-parsed array (this
      // happens when the PHP response's Content-Type header isn't
      // exactly application/json). Without this, .concat() below
      // would silently produce a broken/empty-looking list with no
      // console error - which looks exactly like "spinner shows but
      // no new items appear".
      let newItems = res;
      if (typeof newItems === 'string') {
        try {
          newItems = JSON.parse(newItems);
        } catch (e) {
          console.error('News List response was a string and failed to parse as JSON:', res);
          newItems = [];
        }
      }
      if (!Array.isArray(newItems)) {
        console.error('News List response was not an array, got:', newItems);
        newItems = [];
      }

      console.log('News List parsed items -->', newItems, 'count:', newItems.length);

      this.NewsList = this.NewsList.concat(newItems);
      this.newsOffset += newItems.length;

      // Server returned fewer items than a full page -> nothing left to load
      if (newItems.length < this.newsPageSize) {
        this.newsAllLoaded = true;
      }

      console.log('this.NewsList -->', this.NewsList);

      this.ionLoaderService.dismissLoader();

      if (event) {
        event.target.complete();
        if (this.newsAllLoaded) {
          event.target.disabled = true;
        }
      }
    }, (err) => {
      console.log('News List error -->', err);
      this.ionLoaderService.dismissLoader();
      if (event) { event.target.complete(); }
    });
  }

  // Bound to (ionInfinite) on the News List's ion-infinite-scroll
  loadMoreNews(event: any) {
    this.loadNews(event);
  }

  // trackBy for the News List *ngFor: without this Angular re-tracks
  // items by object reference, which is fine after concat() too, but
  // this makes it explicit/robust and avoids any DOM re-render oddity
  // when items are appended.
  trackByNewsId(index: number, news: any): any {
    return news && news.newsid ? news.newsid : index;
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
      return false;
    }

    // Point 15 fix: date was never required before submitting, so an
    // empty datepost was sent to the server and got stored as
    // '0000-00-00' (MySQL's default for an empty/invalid DATE value).
    // Requiring it here, same as Title, stops that at the source.
    if (!this.datepost) {
      this.toastservice.presentToast('Please Select Date of Publish');
      return false;
    }

    // Point 19 fix: guard against the SUBMIT button firing more than
    // one save request. Without this, tapping SUBMIT again while the
    // first request (which takes longer when attachments are being
    // uploaded) was still in flight queued up another save - which is
    // what looked like "have to tap once per attachment" to finally
    // get one successful insert.
    if (this.isSubmitting) {
      return false;
    }
    this.isSubmitting = true;

    this.assignhomeworkservice.savenews(this.title, this.newstype, this.imgcatid, this.ImgSubCat, this.newsContent, this.datepost, this.base64DataArray, this.descriptions, this.orientations).subscribe((res) => {
      console.log("here is save news-->", res);
      this.isSubmitting = false;

      // Point 20 fix: previously this always showed
      // "Record Inserted Successfully" no matter what the server
      // returned. Now it checks for the duplicate-title error the
      // backend sends (see news_manger_save.php) and shows that
      // message instead of a false success toast.
      if (res && res['status'] === false) {
        this.toastservice.presentToast(res['message'] || 'Unable to save news. Please try again.');
        return;
      }

      this.toastservice.presentToast("Record Inserted Successfully");
      this.resetNewsForm();
      this.ionViewWillEnter();
      this.category = 'writeapplication';
    }, (err) => {
      // also release the guard if the request itself fails
      this.isSubmitting = false;
      this.toastservice.presentToast('Unable to save news. Please try again.');
    })
  }

  // Point 13 fix: clears every field bound to the Add News form. Without
  // this, coming back to the "ADD NEWS" tab after a submit still showed
  // the previous title/subject/content/date/images, and tapping SUBMIT
  // again silently created a duplicate news item.
  resetNewsForm() {
    this.title = '';
    this.newstype = undefined;
    this.imgcatid = undefined;
    this.ImgSubCat = undefined;
    this.subCaArrarData = [];
    this.newsContent = '';
    this.quillData = '';
    this.datepost = undefined;
    this.dateParts_to = undefined;
    this.selectedFileNames = [];
    this.base64DataArray = [];
    this.descriptions = [];
    this.orientations = [];
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