import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SociallinkPageRoutingModule } from './sociallink-routing.module';

import { SociallinkPage } from './sociallink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SociallinkPageRoutingModule
  ],
  declarations: [SociallinkPage]
})
export class SociallinkPageModule {}
