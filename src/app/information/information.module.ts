import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';


@NgModule({
  declarations: [
    InformationComponent,
    PersonalInfoComponent,
    CompanyInfoComponent,
    AddFilesComponent,
    ReviewSubmitComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    ReactiveFormsModule
  ]
})
export class InformationModule { }
