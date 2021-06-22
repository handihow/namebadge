import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { InformationService } from '../information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  companyInfoForm: FormGroup;

  constructor(private informationService: InformationService, private router: Router) { }

  ngOnInit(): void {
    const {
      companyName = '',
      department = '',
      street = '',
      city = '',
      zip = '',
      website = ''
    } = this.informationService.getCompanyInformation() || {};
    this.companyInfoForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      department: new FormControl(department),
      street: new FormControl(street),
      city: new FormControl(city),
      zip: new FormControl(zip),
      website: new FormControl(website)
    });
  }

  get companyName() { return this.companyInfoForm.get('companyName'); }

  onSubmit(){
    if(this.companyInfoForm.invalid) {
      Object.keys(this.companyInfoForm.controls).forEach(field => {
        const control = this.companyInfoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    } else {
      this.informationService.setCompanyInformation({
        companyName: this.companyInfoForm.value.companyName,
        department: this.companyInfoForm.value.department ? this.companyInfoForm.value.department : null,
        street: this.companyInfoForm.value.street ? this.companyInfoForm.value.street : null,
        city: this.companyInfoForm.value.city ? this.companyInfoForm.value.city : null,
        zip: this.companyInfoForm.value.zip ? this.companyInfoForm.value.zip : null,
        website: this.companyInfoForm.value.website ? this.companyInfoForm.value.website : null
      });
      this.router.navigateByUrl('/information/add-files');
    }
  }

}
