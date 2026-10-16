import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleattachmentmodalPage } from './articleattachmentmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleattachmentmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleattachmentmodalPageRoutingModule {}
