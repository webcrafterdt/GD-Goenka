import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageforuserPageRoutingModule } from './imageforuser-routing.module';

import { ImageforuserPage } from './imageforuser.page';
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
    ImageforuserPageRoutingModule,
    ArticleattachmentmodalPage
  ],
  declarations: [ImageforuserPage]
})
export class ImageforuserPageModule {}
