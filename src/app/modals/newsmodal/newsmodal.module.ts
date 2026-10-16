import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsmodalPageRoutingModule } from './newsmodal-routing.module';

import { NewsmodalPage } from './newsmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsmodalPageRoutingModule
  ],
  declarations: [NewsmodalPage]
})
export class NewsmodalPageModule {}
