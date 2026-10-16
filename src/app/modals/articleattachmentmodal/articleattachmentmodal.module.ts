import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleattachmentmodalPageRoutingModule } from './articleattachmentmodal-routing.module';

import { ArticleattachmentmodalPage } from './articleattachmentmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleattachmentmodalPageRoutingModule
  ],
  declarations: [ArticleattachmentmodalPage]
})
export class ArticleattachmentmodalPageModule {}
