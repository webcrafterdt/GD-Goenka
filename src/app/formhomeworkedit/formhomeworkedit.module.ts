import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormhomeworkeditPageRoutingModule } from './formhomeworkedit-routing.module';

import { FormhomeworkeditPage } from './formhomeworkedit.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    FormhomeworkeditPageRoutingModule
  ],
  declarations: [FormhomeworkeditPage]
})
export class FormhomeworkeditPageModule {}
