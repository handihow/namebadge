import { Component, OnInit } from '@angular/core';
import { InformationService } from '../information.service';
import PersonalInformation from '../../models/personalInfo.model';
import CompanyInformation from 'src/app/models/companyInfo.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss']
})
export class ReviewSubmitComponent implements OnInit {

  personalInformation: PersonalInformation;
  companyInformation: CompanyInformation;

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.personalInformation = this.informationService.getPersonalInformation();
    this.companyInformation = this.informationService.getCompanyInformation();
  }

  onSubmit(){
    console.log('submitting information');
    this.informationService.submitInformation();
  }

}
