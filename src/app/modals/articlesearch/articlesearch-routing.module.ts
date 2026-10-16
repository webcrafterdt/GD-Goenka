import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesearchmodalPage } from './articlesearchmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesearchmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesearchmodalPageRoutingModule { }
