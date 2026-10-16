import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsmanagerPageRoutingModule } from './newsmanager-routing.module';

import { NewsmanagerPage } from './newsmanager.page';
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
    NewsmanagerPageRoutingModule,
    NewsmodalPageModule
  ],
  declarations: [NewsmanagerPage]
})
export class NewsmanagerPageModule {}
