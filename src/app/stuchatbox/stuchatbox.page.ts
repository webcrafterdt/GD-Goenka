import { Component, OnInit, Optional,ViewChild  } from '@angular/core';
import { MenuController,ActionSheetController,IonContent } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { HttpClient ,HttpEventType,HttpHeaders,HttpParams } from '@angular/common/http';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { GroupchatService } from 'src/app/services/groupchat.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-stuchatbox',
  templateUrl: './stuchatbox.page.html',
  styleUrls: ['./stuchatbox.page.scss'],
})
export class StuchatboxPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  session: any;
  f_id: any;
  college: any;
  ionicForm: FormGroup;
  fname: any;
  imgpath: any;
  name: any;
  image: any;
  localimage: any;
  user_hostel: any;
  studentname: any;
  fromDate: any;
  toDate: any;
  dateParts: any;
  dateParts_to: any;
  details: any = [];
  fromdate: any;
  Final_Due_Amount_ArrayObject:any=[];
  TotalDue_Amount: any;
  TotalPaidRangeWise: any;
  TotalPaid_Amount_OD: any;
  display: any;
  fromdate_post: any;
  todate_post: any;
  SessStart: any;
  SessEnd: any;
  downloadUrl:any;
  sessioncaption: any;
  display_till_date: any;
  CurrentDate: any;
  totalstudents: any;
  presentstudents: any;
  classname: any;
  Final_Due_Amount_Array:any=[];
  grouplist:any=[];
  groupid:any;
  userImg:any;
  hideimagediv:any;
  chat_box:any = [];
  message_text:any;
  image_big:any;
  GroupName:any;
  chat_box_length:any = [];
  downloadProgress = 0;
  HeaderName:any;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public formBuilder: FormBuilder,private fileopener:FileOpener,public http:HttpClient,private camera:Camera,public actionSheetCtrl: ActionSheetController, private groupchat: GroupchatService, public menuCtrl: MenuController, private storage: StorageService, private route: ActivatedRoute, private router: Router, private ionLoaderService: IonLoaderService,
    private platform: Platform, @Optional() private routerOutlet?: IonRouterOutlet) {
    this.menuCtrl.enable(false);
    this.groupid =this.route.snapshot.paramMap.get('id');   

    this.GroupName =this.route.snapshot.paramMap.get('id2');   
    
    this.SessStart = localStorage.getItem('SessStart');
    this.SessEnd = localStorage.getItem('SessEnd');
    this.CurrentDate = localStorage.getItem('CurrentDate');
    this.sessioncaption = localStorage.getItem('caption');
    this.ionicForm = this.formBuilder.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]]

    })
    console.log('this.classname--xxx>', this.classname);
    this.image_big=0;
    this.name = localStorage.getItem('name');
    this.studentname = localStorage.getItem('studentname');

    //this.imgpath = this.route.snapshot.paramMap.get('id2');  
    console.log('herrrr 11--xxx>', localStorage.getItem('first_name'));
    //console.log('herrrr 22-->',this.route.snapshot.paramMap.get('id2'));  
    //const ret = await Preferences.get({ key: 'sid' });

    console.log("==--==-->",)
    //console.log('first_nname 11-->',Preferences.get({ key: 'first_name' }))

 

    console.log('first 11====>', this.todate_post);
    
  }

  
  
  openfile(filepath)
  {
    Browser.open({ url: filepath });
  }

  bigumage(data,id)
  {
    console.log('data ==>',data);
    console.log('id ==>',id);
     if(data == 1)
    {
    this.image_big=1;      
    }
    if(data == 0)
    {
      this.image_big=0;
    }
  }


  ngOnInit() {
  if(this.groupid)
    {
      this.HeaderName=this.GroupName
    }
    else
    {
      this.HeaderName=localStorage.getItem('studentname');
    }

    this.groupchat.group_chat(this.groupid,localStorage.getItem('tid')).subscribe((res) => {
      this.chat_box=res;
      console.log('this.chat_box==> XXXX', this.chat_box);
      this.chat_box_length=this.chat_box.length;
      console.log("this.chat_box_length===>",this.chat_box_length);
      this.ionLoaderService.dismissLoader();
      this.content.scrollToBottom();
    });
    this.ionLoaderService.dismissLoader();



  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

  async SelectPic(){
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take a picture',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.openCamera(1);
          }
        },
        {
          text: 'Choose pictures',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.openCamera(0);
          }
        }
      ]
    });
    actionSheet.present();
  
  }


  openCamera(sourceType) {
    this.hideimagediv='block';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.userImg = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  cancelimage()
{
  this.userImg=' ';
  this.hideimagediv='none';
}

  getlocalstoragedata() {
    return Promise.all([localStorage.getItem('f_id'), localStorage.getItem('college'), localStorage.getItem('session')]).then((values) => {
      console.log("here i am right now =>", values);
      this.f_id = values['0'];
      this.college = values['1'];
      this.session = values['2'];

    });

  }
  groupdetaillist(id)
  {
    console.log("Stu id====>",id);
     this.router.navigate(["/groupdetail",id]);
    
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

            // Attempt to read the directory to check if it exists
          //   try{
          //     await Filesystem.mkdir({
          //       path: folderPath,
          //       directory: Directory.Documents,
          //       recursive: true,
          //     });
          //     console.log("Successfully created");
          // }
          // catch(error)
          // {
          //   console.log("here is create directory error",error.message )
          // }

          // const savedFile = await Filesystem.writeFile({  
          //   path: `${folderPath}/${name}`,
          //   data: base64,
          //   directory: Directory.External as FilesystemDirectory,
          // });


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
  sendmessage()
  {
    console.log('this.message_text ==>',this.message_text);

    this.groupchat.send_message(this.groupid,this.message_text,localStorage.getItem('tid'),this.userImg,'').subscribe((res) => {
      this.chat_box=res['response'];
      console.log('this.chat_box==>messages', this.chat_box);
      //this.ngOnInit();
      //this.content.scrollToBottom();
      this.ionViewDidEnter();
      this.ionLoaderService.dismissLoader();
    });
    this.message_text='';
    this.ionLoaderService.dismissLoader();
  }


  logout(page) {
    // this.navCtrl.setRoot(page);
    localStorage.clear();
    Preferences.remove({ key: 'sid' });

    // this.router.navigate(["/login"]);
    this.router.navigate(["/login1"]);
  }

}
