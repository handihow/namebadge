import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import PersonalInformation from '../../models/personalInfo.model';
import CompanyInformation from '../../models/companyInfo.model';
import UCFile from '../../models/file.model';

interface Item {
  label: string;
  value: string;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  personalItems : Item[] = [];
  companyItems: Item[] = [];
  files: UCFile[] = [];

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    const item = await this.listService.getItem(id);
    this.createPersonalItems(item.personalInfo);
    this.createCompanyItems(item.companyInfo);
    if(item.files) {
      this.files = item.files;
    }
  }

  createPersonalItems(personalInfo: PersonalInformation) {
    [
      { key: 'firstName', label: 'First name' },
      { key: 'lastName', label: 'Last name' },
      { key: 'jobTitle', label: 'Job title' },
      { key: 'email', label: 'Email' },
      { key: 'mobilePhone', label: 'Mobile phone' },
      { key: 'officePhone', label: 'Office phone' }
    ].forEach(obj => {
      this.personalItems.push({
        label: obj.label,
        value: personalInfo[obj.key] || '-'
      })
    })
  }

  createCompanyItems(companyInfo: CompanyInformation) {
    [
      { key: 'companyName', label: 'Company name' },
      { key: 'department', label: 'Department' },
      { key: 'street', label: 'Street' },
      { key: 'zip', label: 'Postal code' },
      { key: 'city', label: 'City' },
      { key: 'website', label: 'Website' }
    ].forEach(obj => {
      this.companyItems.push({
        label: obj.label,
        value: companyInfo[obj.key] || '-'
      })
    })
  }

}
