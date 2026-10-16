import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinereceiptPageRoutingModule } from './onlinereceipt-routing.module';

import { OnlinereceiptPage } from './onlinereceipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinereceiptPageRoutingModule
  ],
  declarations: [OnlinereceiptPage]
})
export class OnlinereceiptPageModule {}
