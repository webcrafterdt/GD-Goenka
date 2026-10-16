import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CirculareditPageRoutingModule } from './circularedit-routing.module';

import { CirculareditPage } from './circularedit.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuillModule,
    CirculareditPageRoutingModule
  ],
  declarations: [CirculareditPage]
})
export class CirculareditPageModule {}
