import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Zaroori import
import { ModalController, IonicModule, NavParams } from '@ionic/angular';
import { AssignhomeworkService } from 'src/app/services/assignhomework.service';

@Component({
  selector: 'app-articlesearchmodal',
  templateUrl: './articlesearch.page.html',
  styleUrls: ['./articlesearch.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule] // 👈 FormsModule yahan zaroor hona chahiye
})
export class ArticlesearchmodalPage implements OnInit {

  subjects: any[] = []; // Parent page se aayenge
  AuthoreLists: any = [];
  // Search data structure
  searchData = {
    text: '',
    authorid: '0',
    findIn: 'title',
    subjectId: '0',
    applyDate: false,
    startDate: '',
    endDate: ''
  };


  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private assignhomeworkservice: AssignhomeworkService
  ) { }

  ngOnInit() {
    // Parent page (articleforuser) se subjects list receive karein
    const passedSubjects = this.navParams.get('subjects');
    if (passedSubjects) {
      this.subjects = passedSubjects;
    }
    this.assignhomeworkservice.AuthoreList().subscribe((res) => {
      console.log('Author List==>', res);
      this.AuthoreLists = res;
    });
  }

  // Search submit karne par data wapas bhejein
  submitSearch() {
    console.log("Submitting Filter Data -->", this.searchData);
    this.modalController.dismiss(this.searchData);
  }

  // Form clear karne ke liye
  resetSearch() {
    this.searchData = {
      text: '',
      findIn: 'title',
      authorid: '0',
      subjectId: 'all',
      applyDate: false,
      startDate: '',
      endDate: ''
    };
  }

  // Modal band karne ke liye
  async dismiss() {
    await this.modalController.dismiss(null);
  }
}