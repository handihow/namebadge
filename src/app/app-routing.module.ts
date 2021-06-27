import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then(m => m.InformationModule)
  },
  {
    path: 'finished',
    loadChildren: () => import('./finished/finished.module').then(m => m.FinishedModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'information'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
