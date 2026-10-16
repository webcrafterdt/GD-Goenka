import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormhomeworkeditPage } from './formhomeworkedit.page';

const routes: Routes = [
  {
    path: '',
    component: FormhomeworkeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormhomeworkeditPageRoutingModule {}
