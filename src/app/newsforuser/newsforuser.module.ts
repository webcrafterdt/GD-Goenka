import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsforuserPageRoutingModule } from './newsforuser-routing.module';

import { NewsforuserPage } from './newsforuser.page';
import { QuillModule } from 'ngx-quill';
import { NewsmodalPage } from '../modals/newsmodal/newsmodal.page';
import { NewsmodalPageModule } from '../modals/newsmodal/newsmodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuillModule.forRoot(),
    NewsforuserPageRoutingModule,
    NewsmodalPageModule
  ],
  declarations: [NewsforuserPage]
})
export class NewsforuserPageModule {}
