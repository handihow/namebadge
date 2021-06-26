import { Observable } from 'rxjs';
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
  inProgress = false;
  hasErrors = false;
  informationStatus$: Observable<any>;

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.personalInformation = this.informationService.getPersonalInformation();
    this.companyInformation = this.informationService.getCompanyInformation();
  }

  async onSubmit(){
    this.inProgress = true;
    const docId = await this.informationService.submitInformation();
    this.inProgress = false;
    if(docId){
      this.informationStatus$ = this.informationService.checkEmailStatus(docId);
    } else {
      this.hasErrors = true;
    }
  }

}
