import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import PersonalInformation from '../models/personalInfo.model';
import CompanyInformation from '../models/companyInfo.model';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private _personalInformation: PersonalInformation;
  private _companyInformation: CompanyInformation;

  constructor(private db: AngularFirestore) { }

  getPersonalInformation() {
    return this._personalInformation;
  }

  setPersonalInformation(personalInfo: PersonalInformation){
    this._personalInformation = personalInfo;
  }

  getCompanyInformation() {
    return this._companyInformation;
  }

  setCompanyInformation(companyInfo: CompanyInformation) {
    this._companyInformation = companyInfo;
  }

  submitInformation(){
    console.log(this._personalInformation);
    console.log(this._companyInformation);
    if(!this._personalInformation || !this._companyInformation) return;
    console.log('submitting to fb')
    this.db.collection('information').add({
      personalInfo: this._personalInformation,
      companyInfo: this._companyInformation,
      files: [],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(value => console.log(value))
    .catch(err => console.log(err));
  }

}
