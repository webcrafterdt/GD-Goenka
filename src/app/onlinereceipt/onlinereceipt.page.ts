import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OverlayEventDetail } from '@ionic/core/components';
import { FeesService } from 'src/app/services/fees.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-onlinereceipt',
  templateUrl: './onlinereceipt.page.html',
  styleUrls: ['./onlinereceipt.page.scss'],
})
export class OnlinereceiptPage implements OnInit {
  disableCollegeSegmentButton: boolean = true;

  selectedtab:any;
  feesdetail:any=[];
  showhide:any;
  receiptno:any;
  FeeReceiptUrl:any;
  receipt_url:any;
  paybleamount:any;
  bill_master_ids:any=[];
  checkboxcheck:any;
  concession_id:any;
  concession_amount:any;
  iFineAmount:any;
  adjustable_amount:any;
  dataLoaded:any;
  studentid:any;
  NoBillScheme:any;
  image:any;
  studentname:any;
  fathername:any;
  classname:any;
  dob:any;
  EnrollNo:any;
  
  NoPendingBills:any;
  category:any;
  BillMasterId:any=[];
  due_type:any;
  pmt_gtway:any;
  PaymentMessage:any;
  Transactions:any;
  TransactionsReceiop:any;
  payment_id:any;







  Name:any;

enrollno:any;
fee_type:any;
amount_paid:any;
reference_no:any;
transaction_id:any;
transactionDate:any;
PaymentGateway:any;
MessagePrint:any;
  constructor(private feeservice: FeesService,private route: ActivatedRoute,private router: Router,private ionLoaderService: IonLoaderService,
    private storage:StorageService,public platform: Platform) {
      this.due_type='CD';
      this.pmt_gtway='AIRPAY';
      this.showhide = false;
      this.paybleamount = 0;
      this.studentid=localStorage.getItem('studentid');
      
      
      this.payment_id=this.route.snapshot.paramMap.get('id');    
      
      this.image=localStorage.getItem('photo');
      console.log('this.image-->',this.image);



       this.studentname=localStorage.getItem('studentname');
       this.fathername=localStorage.getItem('fathername');
       this.classname=localStorage.getItem('classname');
       this.dob=localStorage.getItem('dob');
       this.EnrollNo=localStorage.getItem('registration_number');
       this.category='feedetail';
   }


  
  ionViewDidEnter()
  {
    this.ngOnInit();
  }
  ngOnInit() {
    this.disableCollegeSegmentButton = false;
    this.paybleamount = 0;
    this.selectedtab='College';
  // this.ionLoaderService.simpleLoader();
    
  this.GetTransactionsReceipts();




   //setTimeout(() => {}, 0);
   this.ionLoaderService.dismissLoader();
   this.dataLoaded=false;

  }  




  GetTransactionsReceipts()
  {
    this.ionLoaderService.simpleLoader();
    this.feeservice.transactionsReceipts(this.payment_id).subscribe((res12) =>{
      this.TransactionsReceiop=res12;

      this.Name=this.TransactionsReceiop.Name;
      this.classname=this.TransactionsReceiop.classname;
      this.enrollno=this.TransactionsReceiop.enrollno;
      this.fee_type=this.TransactionsReceiop.fee_type;
      this.amount_paid=this.TransactionsReceiop.amount_paid;
      this.reference_no=this.TransactionsReceiop.reference_no;
      this.transaction_id=this.TransactionsReceiop.transaction_id;
      this.transactionDate=this.TransactionsReceiop.transactionDate;
      this.PaymentGateway=this.TransactionsReceiop.PaymentGateway;
      this.MessagePrint=this.TransactionsReceiop.MessagePrint;
      

      console.log('this.TransactionsReceiop 11==>',this.TransactionsReceiop);
      this.ionLoaderService.dismissLoader();
      });
  }






  
}