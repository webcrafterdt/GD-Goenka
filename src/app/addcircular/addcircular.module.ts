import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcircularPageRoutingModule } from './addcircular-routing.module';

import { AddcircularPage } from './addcircular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddcircularPageRoutingModule
  ],
  declarations: [AddcircularPage]
})
export class AddcircularPageModule {}
