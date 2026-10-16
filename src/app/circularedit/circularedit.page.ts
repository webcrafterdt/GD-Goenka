import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LeaveapplicationService } from 'src/app/services/leaveapplication.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { CircularService } from 'src/app/services/circular.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContentChange, QuillEditorComponent, QuillModules } from 'ngx-quill';
import { ActivatedRoute } from "@angular/router";
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { HttpClient ,HttpEventType,HttpHeaders,HttpParams } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-circularedit',
  templateUrl: './circularedit.page.html',
  styleUrls: ['./circularedit.page.scss'],
})
export class CirculareditPage implements OnInit {
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
  CircularContent: any;
  CircularId: any;
  AssignedCircular: any;
  quillData:any;
  userImg: any;
  FileExists: any;
  selectedFileName: any;
  hideimagediv: any;
  base64datavalue: any;
  attachfile_path:any;
  attachfile:any;
  downloadUrl:any;
  downloadProgress = 0;
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent
  constructor(private toast: ToastService,public http:HttpClient,private fileopener:FileOpener, private platform: Platform, private route: ActivatedRoute, private circularservice: CircularService, private Leaveapplicationservice: LeaveapplicationService, private router: Router, private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder) {
    this.CircularContent = '';
    this.base64datavalue = ' ';
    this.CircularId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {





    this.ionicForm = this.formBuilder.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      reason: ['', [Validators.required]]

    })
  }

  ionViewWillEnter()
  {
    this.title = '';
    this.CircularContent = '';
    this.dateParts = '';
    this.dateParts_to = '';
    this.selectedFileName = '';
    this.base64datavalue = '';
    this.attachfile= '';

    this.circularservice.assigned_circular_master(this.CircularId).subscribe((res) => {
      this.AssignedCircular = res;
      console.log("this.AssignedCircular====>",this.AssignedCircular);
      this.CircularContent=this.AssignedCircular.Description;
      this.title=this.AssignedCircular.Title;
      this.dateParts=this.AssignedCircular.fromdate;
      this.dateParts_to=this.AssignedCircular.todate;
      this.attachfile_path=this.AssignedCircular.attachfile_path;
      this.attachfile=this.AssignedCircular.attachfile;
      this.ionLoaderService.dismissLoader();
    });
  }

  triggerPdfInput() {
    const pdfInput = document.getElementById('pdfInput') as HTMLInputElement;
    if (pdfInput) {
      console.log("hereererer");
      pdfInput.value = '';
      this.FileExists = 'Y';
      pdfInput.click();
      console.log("this.FileExists==>", this.FileExists);

    }
  }












  async downloadFile(url)
  {
  //  this.toastservice.presentToast('file downloaded successfully');
  //this.ionLoaderServi0ce.simpleLoader();
    console.log("ttttt");
    this.downloadUrl = url ? url : this.downloadUrl;//'https://cors-anywhere.herokuapp.com/'+url;// url ? url : this.downloadUrl;

    const name = this.downloadUrl.substring(this.downloadUrl.lastIndexOf('/') + 1);
    const path = `storage/emulated/0/Documents/${name}`;
     //const fileExists = await this.checkFileExists(path);
    
   //  
     console.log("File Name Here ==>",name);
     console.log("Directory.Documents ==>",Directory.Documents);
     console.log("Directory.path ==>",path);
     
     console.log("name 22====>",name);
     console.log("sdsddsdd xx->",this.downloadUrl);
    try {
    this.http.get(this.downloadUrl,{
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe(async  event => {
      //http://192.168.2.4/development/school/vydehi../download/328_search-2.pdf
      if (event.type === HttpEventType.DownloadProgress)
      {//alert('Unable to write file 3');
        this.downloadProgress = Math.round((100 * event.loaded)/ event.total);
      }
        else if(event.type === HttpEventType.Response)
      {//alert('4 ---->' + event.type);
        this.downloadProgress =0;
       // alert('4');
        const name =this.downloadUrl.substring(this.downloadUrl.lastIndexOf('/') +1);
        const base64 = await this.convertBlobToBase64(event.body) as string;
      //  const fileExists = await this.checkFileExists(Directory.Documents+'/'+path);
       
       
        const fileExists1 = await this.checkFileExists(name);
        
        //console.log("fileExists 11====>1",fileExists);
        console.log("fileExists1 22====>2",fileExists1);
        console.log('file pahssss-->',Directory.Documents+path);
        console.log("Directory.External====>",Directory.External);
        
        //directory : Directory.ExternalStorage
       if(fileExists1 == false)
       {
      
          try {


            const folderPath = 'myCustomFolder';




          try{
        const savedFile = await Filesystem.writeFile({
          path :name,
          //path: `${folderPath}/${name}`,
          data : base64,
          directory : Directory.Documents
          //directory:Directory.External 
        });
       
     
        //.then((uri)=>{
          //this.toastservice.presentToast('file downloaded successfully');
          const path = savedFile.uri;
          console.log('path after dowwwwn',path);
          // get the mimetype of the file
          const mimeType = this.getMimetype(name);
      
          // open the file in the appropriate viewer
          //this.fileopener.open(path, mimeType).then(()=>console.log("file opened successfully")).catch(error =>console.log(error,'error here'));
              this.fileopener.open(path, mimeType)
              .then(() => console.log("file opened successfully"))
              .catch(error => {
                console.log(error, 'error here');
                Browser.open({ url: this.downloadUrl });
              });
        }
          catch(error)
        {
          console.log("herererererer error =>",error.message);
          try{
            const savedFile = await Filesystem.writeFile({
              path :name,
             // path: `${folderPath}/${name}`,
              data : base64,
              //directory : Directory.Documents
              directory:Directory.External 
            });
           
         
            //.then((uri)=>{
              //this.toastservice.presentToast('file downloaded successfully');
              const path = savedFile.uri;
              console.log('path after dowwwwn',path);
              // get the mimetype of the file
              const mimeType = this.getMimetype(name);
          
              // open the file in the appropriate viewer
              //this.fileopener.open(path, mimeType).then(()=>console.log("file opened successfully")).catch(error =>console.log(error,'error here'));
    
              this.fileopener.open(path, mimeType)
              .then(() => console.log("file opened successfully"))
              .catch(error => {
                console.log(error, 'error here');
                Browser.open({ url: this.downloadUrl });
              });
            


            }
            catch(error)
            {Browser.open({url: this.downloadUrl});
              console.log("herererererer error =>",error.message);
              this.ionLoaderService.dismissLoader();
              
            }
        }
      
        
      } catch (error) {
        //alert('-->7');
       // alert('--> 8'+ JSON.stringify(error));
       // alert('Unable to write file'+ error);
       console.log('111111error---->',error);
       console.log('11111error JSON.stringify---->',JSON.stringify(error));
       try{
        const savedFile = await Filesystem.writeFile({
          path :name,
         // path: `${folderPath}/${name}`,
          data : base64,
          //directory : Directory.Documents
          directory:Directory.External 
        });
       
     
        //.then((uri)=>{
          //this.toastservice.presentToast('file downloaded successfully');
          const path = savedFile.uri;
          console.log('path after dowwwwn',path);
          // get the mimetype of the file
          const mimeType = this.getMimetype(name);
      
          // open the file in the appropriate viewer
         // this.fileopener.open(path, mimeType).then(()=>console.log("file opened successfully")).catch(error =>console.log(error,'error here'));
         this.fileopener.open(path, mimeType)
         .then(() => console.log("file opened successfully"))
         .catch(error => {
           console.log(error, 'error here');
           Browser.open({ url: this.downloadUrl });
         });

        }
        catch(error)
        {
          console.log("herererererer error =>",error.message);
          Browser.open({url: this.downloadUrl});
          this.ionLoaderService.dismissLoader();
        }
      }
    }
     else
    {  
      //const name =this.downloadUrl.substring(this.downloadUrl.lastIndexOf('/') +1);
      // const name1 ='https://vydehi.literom.com/download/school.pdf'.substring('https://vydehi.literom.com/download/school.pdf'.lastIndexOf('/') +1);
      // const path1 = `storage/emulated/0/Documents/${name1}`;
      // const mimeType1 = this.getMimetype(name1);
      // console.log('mimeType in after download',mimeType1);
      // console.log('name in after download',name1);
      // console.log('paths in after download',path1);
      // this.fileopener.open(path1, mimeType1).then(()=>console.log("file opened successfully")).catch(error =>console.log(error.message,'error here'));

//This Condition if for if file already exists
      try{
        const savedFile = await Filesystem.writeFile({
          path :name,
         // path: `${folderPath}/${name}`,
          data : base64,
          //directory : Directory.Documents
          directory:Directory.External 
        });
       
     
        //.then((uri)=>{
          //this.toastservice.presentToast('file downloaded successfully');
          const path = savedFile.uri;
          console.log('path after dowwwwn',path);
          // get the mimetype of the file
          const mimeType = this.getMimetype(name);
      
          // open the file in the appropriate viewer
          //this.fileopener.open(path, mimeType).then(()=>console.log("file opened successfully")).catch(error =>console.log(error,'error here'));
          this.fileopener.open(path, mimeType)
          .then(() => console.log("file opened successfully"))
          .catch(error => {
            console.log(error, 'error here');
            Browser.open({ url: this.downloadUrl });
          });
        }
        catch(error)
        {
          console.log("herererererer error =>",error.message);
          this.ionLoaderService.dismissLoader();
          Browser.open({url: this.downloadUrl});
        }
    }
      }
        this.ionLoaderService.dismissLoader();
     }, (error) => {
      console.log("Catch error ",error);
          //alert("Catch error "+JSON.stringify(error));
          this.ionLoaderService.dismissLoader();
    })
  } catch (error) {
    console.log('error---->',error);
    console.log('error JSON.stringify---->',JSON.stringify(error));
    Browser.open({url: this.downloadUrl});
    this.ionLoaderService.dismissLoader();
    //alert('10 -->'+JSON.stringify(error));
   //   alert('Unable to write file1111'+ error);
  }





  }



  async checkFileExists(path) {
    try {
    //  const encodedPath = `storage/emulated/0/Documents/${encodeURIComponent('2_Orientation circular pre-primary & grade 1-2023-24.pdf')}`;
   // const encodedPath = `storage/documents/2_Orientation circular pre-primary & grade 1-2023-24.pdf`;
        const fileStat = await Filesystem.stat({
        path: path,
        directory: Directory.Documents,
      });
          return fileStat ? true : false;
    } catch (error) {
      console.log('.error==>hereeee', error);
      return false;
    }
  }

  
  private  convertBlobToBase64 = (blob:Blob) => new Promise((resolve,reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = ()  =>
    {
       resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  getMimetype(filename: string): string {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
      case 'docx':
        return 'application/msword';
      case 'xls':
      case 'xlsx':
        return 'application/vnd.ms-excel';
      default:
        return 'application/octet-stream';
    }
  }




















  async onFileSelect(event) {
    console.log("xxxxxxx==>", event.target.files[0]);
    console.log("event xxxxxxx==>", event);
    const file = event.target.files[0];


    const allowedFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/gif',
      'image/bmp',
      'image/png',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    // Check if the file type is allowed
    if (!allowedFileTypes.includes(file.type)) {
      alert('Invalid file type. Please select a valid file.');
      return false;
    }


    if (file) {

      if (file.size > 1048576) {
        //if (file.size > 10485) {
        alert('File size exceeds 1 MB. Please select a smaller file.');
        return false;
      }
      else {
        this.userImg = '';
        this.selectedFileName = file.name;
        // Read the file as base64
        const reader = new FileReader();
        reader.onload = async () => {
          const base64File = reader.result as string;

          // Save the entire base64 data with prefix
          this.base64datavalue = base64File;
          // this.savedata(this.base64datavalue);


          // If you need to save the file without the base64 prefix
          const base64Data = base64File.split(',')[1];

          // Save the file to the appropriate directory
          const directory = this.platform.is('android') ? Directory.External : Directory.Documents;
          const result = await Filesystem.writeFile({
            path: this.selectedFileName,
            data: base64Data,
            directory: directory,
          });

          // Get the file URI
          this.hideimagediv = 'block';
          console.log("Selected this.base64datavalue:", this.base64datavalue);
          console.log("Selected this.selectedFileName:", this.selectedFileName);


          // this.selectedFilePath = result.uri;
          // console.log("Selected file path:", this.selectedFilePath);
          // console.log("result file path:", JSON.stringify(result));
          // Upload the file
          //this.uploadFile();



        };

        reader.readAsDataURL(file);
      }
    }
  }
















  ngAfterViewInit(): void {
    console.log('Here We Are data ==>', this.editor);
    this.editor.onContentChanged.subscribe((change: ContentChange) => {
      console.log('changed data ==>', change);
    });
  }
  onContentChanged = (event) => {
    // console.log('event=====>',event);
    if (event.html) {
      // Do whatever you want here
      console.log('The content has changed', event.html);
      //this.homeworkhtml=event.html;
      this.CircularContent = event.html;

      console.log('The content this.CircularContent', this.CircularContent);
    }
  }
  quillModules: QuillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['italic', 'underline', 'bold'], // Removed 'bold'
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'] // Removed 'image'
    ]
  };



  submitcircular() {
     console.log('this.fromdate====>', this.dateParts);
    console.log('this.todate====>', this.dateParts_to);
    // return false;
    if (!this.dateParts) {
      this.toast.presentToast('From Date Cannot Be Empty..!!');
      return false
    }
    else if (!this.dateParts_to) {
      this.toast.presentToast('To Date Cannot Be Empty..!!');
      return false
    }
    else if (!this.title) {
      this.toast.presentToast('Title Cannot Be Empty..!!');
      return false
    }

    else if (!this.CircularContent) {
      this.toast.presentToast('Description Cannot Be Empty..!!');
      return false
    }
    else {
      if(this.base64datavalue)
        {
          this.base64datavalue=this.base64datavalue;
        }
        else
        {
          this.base64datavalue='';
        }
        
      this.circularservice.editcircular(this.title, this.CircularContent, this.dateParts, this.dateParts_to,this.selectedFileName, this.base64datavalue,this.CircularId).subscribe((res) => {
        console.log("updated circular", res);
        this.toast.presentToast(res);
        if (res == 'Circular Updated Succesfully') {
          this.router.navigate(["/addcircular"]);
        }

      })
    }


  }

  changeDateFormat_from(date: string) {

    console.log('dateParts====>', this.dateParts);
    this.dateParts = date.substring(0, 10).split("-");
    this.dateParts = this.dateParts[2] + '-' + this.dateParts[1] + '-' + this.dateParts[0];
    if (this.dateParts == 'undefined-undefined-') {
      console.log('date==-->', date);
      this.dateParts = ' ';
    }
    else {
      this.dateParts = this.dateParts;
    }


  }

  from_date(fromdate) {
    console.log('fromdate====>', fromdate);
    this.fromdate = this.changeDateFormat_from(fromdate);
    console.log('this.fromdate====>', this.fromdate);
  }






  changeDateFormat_to(date: string) {

    console.log('dateParts====>', this.dateParts_to);
    this.dateParts_to = date.substring(0, 10).split("-");
    this.dateParts_to = this.dateParts_to[2] + '-' + this.dateParts_to[1] + '-' + this.dateParts_to[0];
    if (this.dateParts_to == 'undefined-undefined-') {
      console.log('date==-->', date);
      this.dateParts_to = ' ';
    }
    else {
      this.dateParts_to = this.dateParts_to;
    }

  }

  to_date(todate) {
    console.log('fromdate====>', todate);
    this.todate = this.changeDateFormat_to(todate);
    console.log('this.todate====>', this.todate);
  }



}


