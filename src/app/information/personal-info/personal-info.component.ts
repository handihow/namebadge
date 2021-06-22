import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { InformationService } from '../information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  personalInfoForm: FormGroup;

  constructor(private informationService: InformationService, private router: Router) { }

  ngOnInit(): void {
    this.personalInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      mobilePhone: new FormControl('', Validators.required),
      officePhone: new FormControl('')
    });
  }

  get firstName() { return this.personalInfoForm.get('firstName'); }
  get lastName() { return this.personalInfoForm.get('lastName'); }
  get jobTitle() { return this.personalInfoForm.get('jobTitle'); }
  get email() { return this.personalInfoForm.get('email'); }
  get mobilePhone() { return this.personalInfoForm.get('mobilePhone'); }

  onSubmit(){
    this.informationService.setPersonalInformation({
      firstName: this.personalInfoForm.value.firstName,
      lastName: this.personalInfoForm.value.lastName,
      jobTitle: this.personalInfoForm.value.jobTitle,
      email: this.personalInfoForm.value.email,
      mobilePhone: this.personalInfoForm.value.mobilePhone,
      officePhone: this.personalInfoForm.value.officePhone ? this.personalInfoForm.value.officePhone : null
    });
    this.router.navigateByUrl('/information/company-info');
  }

}
