import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Observable } from 'rxjs';
import { InformationService } from './information.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  personalInformation$: Observable<boolean>;
  companyInformation$: Observable<boolean>;
  addedFiles: Observable<boolean>;

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.personalInformation$ = this.informationService.completedPersonalInformation;
    this.companyInformation$ = this.informationService.completedCompanyInformation;
    this.addedFiles = this.informationService.addedFilesInformation;
  }

}
