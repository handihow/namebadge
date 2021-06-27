import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishedRoutingModule } from './finished-routing.module';
import { FinishedComponent } from './finished.component';


@NgModule({
  declarations: [
    FinishedComponent
  ],
  imports: [
    CommonModule,
    FinishedRoutingModule
  ]
})
export class FinishedModule { }
