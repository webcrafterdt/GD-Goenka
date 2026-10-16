import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { ArticleattachmentmodalPageRoutingModule } from './addimagemodal-routing.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AddimagemodalPage } from './addimagemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    //ArticleattachmentmodalPageRoutingModule
  ],
  declarations: [AddimagemodalPage]
})
export class AddimagemodalPageModule {}
export { AddimagemodalPage };

