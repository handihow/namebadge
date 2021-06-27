import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationService } from '../information.service';
import { FinishedService } from '../../finished/finished.service';
import PersonalInformation from '../../models/personalInfo.model';
import CompanyInformation from 'src/app/models/companyInfo.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
})
export class ReviewSubmitComponent implements OnInit {
  personalInformation: PersonalInformation;
  companyInformation: CompanyInformation;
  inReview = true;
  hasErrors = false;

  constructor(
    private informationService: InformationService,
    private finishedService: FinishedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalInformation = this.informationService.getPersonalInformation();
    this.companyInformation = this.informationService.getCompanyInformation();
  }

  async onSubmit() {
    this.inReview = false;
    const docId = await this.informationService.submitInformation();
    if (docId) {
      this.finishedService.setDocId(docId);
      this.router.navigateByUrl('/finished');
    } else {
      this.hasErrors = true;
    }
  }

  toggleInReview() {
    this.inReview = !this.inReview;
  }
}
