import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagecategoryPageRoutingModule } from './imagecategory-routing.module';

import { ImagecategoryPage } from './imagecategory.page';
import { QuillModule } from 'ngx-quill';
import { NewsmodalPage } from '../modals/newsmodal/newsmodal.page';
import { ArticleattachmentmodalPage } from '../modals/articleattachmentmodal/articleattachmentmodal.page';
//import { ArticleattachmentmodalPage } from '../modals/nearticleattachmentmodalwsmodal/articleattachmentmodal.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuillModule.forRoot(),
    ImagecategoryPageRoutingModule,
    ArticleattachmentmodalPage
  ],
  declarations: [ImagecategoryPage]
})
export class ImagecategoryPageModule { }
