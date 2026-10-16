import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Router } from "@angular/router";
@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  openwebsite() {
    Browser.open({ url: 'www.gdgisn.com' })
  }

  news() {
    //this.router.navigate(["/teachstudentprofile", id]);
    // this.router.navigate(["/biomatricstafflist"]);
    this.router.navigate(["/newsforuser"]);

  }


  article() {
    this.router.navigate(["/articleforuser"]);
  }


  imageforuser() {
    //this.router.navigate(["/imageforuser"]);
    this.router.navigate(["/imagecategory"]);
  }

}

//biomatricstafflist
