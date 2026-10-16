import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MenuController, ActionSheetController, IonContent, LoadingController } from '@ionic/angular';
import { CircularService } from '../services/circular.service';
import { ToastService } from 'src/app/services/toast.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fname:any;
  emailid:any;
  phoneno:any;
  admno:any;
  address1:any;
  name:any;
  image:any;
  address:any;
  last_name:any;
  fathername:any;
  localimage:any;
  batch_name:any;
  image_big:any;
  user_hostel:any;
  bordercolor:any;
  blood_group:any;
  date_of_admission:any;
  studentname:any;
  classname:any;
  selectedFileName:any;
  hideimagediv:any;
  userImg:any;
  constructor(
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private circularservice: CircularService,
    private toastservice: ToastService,
    private androidPermissions: AndroidPermissions
  ) {

    
   }

  // ... (other properties)

  ngOnInit() {
    
    // ... (existing initialization logic)
    this.image_big=0;
    this.studentname=localStorage.getItem('studentname');
    this.fname=localStorage.getItem('first_name');
    this.last_name=localStorage.getItem('last_name');
    this.emailid=localStorage.getItem('emailid');
    this.phoneno=localStorage.getItem('fathermobile');
    this.address1=localStorage.getItem('address1');
    this.admno=localStorage.getItem('registration_number');
    this.name=localStorage.getItem('name');
    this.batch_name=localStorage.getItem('batch_name');
    this.classname=localStorage.getItem('classname');
   // this.image= '//192.168.2.4/development/college/neotia/app/webroot/'+localStorage.getItem('image');
   this.image=localStorage.getItem('photo');
    this.address=localStorage.getItem('address');
    this.fathername=localStorage.getItem('fathername');
    this.localimage=localStorage.getItem('image_name');
    this.user_hostel=localStorage.getItem('use_hostel');

    this.blood_group=localStorage.getItem('blood_group');
    this.date_of_admission=localStorage.getItem('date_of_admission');
    
    if(this.user_hostel == 'Y')
    {
      this.bordercolor='solid #BBEDBE 1px';
    }
    else
    {
      this.bordercolor='solid #F4D291 1px';
    }
    console.log('this.user_hostel===>',this.user_hostel);
    console.log('this.fathername===>',this.fathername);
    console.log('11address===>',localStorage.getItem('address'));
    console.log('this.image===>',this.image);
    console.log('batch_name===>',this.batch_name);
    console.log('this.localimage===>',this.localimage);


    console.log('this.image here we are ==>');
    this.circularservice.profile().subscribe((res) => {
      this.image=res["stuprofile"]['photo'];
      console.log('this.image ==>',this.image);
    })
        
  }

  async SelectPic() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take a picture',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.checkCameraPermissions(1);
          }
        },
        {
          text: 'Choose pictures',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.checkCameraPermissions(0);
          }
        },
      ]
    });
    actionSheet.present();
  }

  checkCameraPermissions(sourceType) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        if (result.hasPermission) {
          console.log("Permission Laready have");
          this.openCamera(sourceType);
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(
            () => this.openCamera(sourceType),
            () => console.log('Camera permission denied')
          );
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
  }

  // openCamera(sourceType) {
  //   this.selectedFileName = '';
  //   this.hideimagediv = 'block';
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: sourceType
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.userImg = 'data:image/png;base64,' + imageData;
  //     console.log("this.userImg===>", this.userImg);

  //     this.circularservice.profile_update(this.userImg).subscribe((res) => {
  //       console.log('profile update data =>', res);
  //       this.toastservice.presentToast('Updated Successfully');
  //       this.ngOnInit();
  //     });

  //   }, (err) => {
  //     console.log('Camera error:', err);
  //     this.toastservice.presentToast('Error accessing camera: ' + err);
  //   });
  // }




  openCamera(sourceType) {
    this.selectedFileName = '';
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
      //this.userImg = 'data:image/jpeg;base64,' + imageData;
      this.userImg = 'data:image/png;base64,' + imageData;
      console.log("this.userImg===>",this.userImg);
      
    }, (err) => {
      console.log('here is errorll',err);
    });
  }

  // ... (other methods)
}
