import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesearchmodalPageRoutingModule } from './articlesearchmodal-routing.module';

import { ArticlesearchmodalPage } from './articlesearchmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesearchmodalPageRoutingModule
  ],
  declarations: [ArticlesearchmodalPage]
})
export class ArticlesearchmodalPageModule { }
