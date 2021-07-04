import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: ':id',
    component: ListItemComponent
  },
  {
    path: '',
    component: ListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
