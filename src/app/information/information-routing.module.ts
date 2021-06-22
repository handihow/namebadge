import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { InformationComponent } from './information.component';

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoComponent
      },
      {
        path: 'company-info',
        component: CompanyInfoComponent
      },
      {
        path: 'add-files',
        component: AddFilesComponent
      },
      {
        path: 'review-submit',
        component: ReviewSubmitComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'personal-info'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
