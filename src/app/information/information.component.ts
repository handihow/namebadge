import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { InformationService } from './information.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, OnDestroy {

  completedState: Subscription;
  personalInformation = false;
  companyInformation = false;
  uploadedFiles = false;

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.completedState = this.informationService.completedState.subscribe((value) => {
      this.personalInformation = value.personalInformation;
      this.companyInformation = value.companyInformation;
      this.uploadedFiles = value.uploadedFiles
    });
  }

  ngOnDestroy(): void {
    this.completedState.unsubscribe();
  }

}
