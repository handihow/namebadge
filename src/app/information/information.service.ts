import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import PersonalInformation from '../models/personalInfo.model';
import CompanyInformation from '../models/companyInfo.model';
import CompletedParts from '../models/completed.model';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

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
    this.setCompletedState({
      personalInformation: true,
      companyInformation: false,
      uploadedFiles: false
    })
  }

  getCompanyInformation() {
    return this._companyInformation;
  }

  setCompanyInformation(companyInfo: CompanyInformation) {
    this._companyInformation = companyInfo;
    this.setCompletedState({
      personalInformation: true,
      companyInformation: true,
      uploadedFiles: false
    })
  }

  private _createDefaultCompletedState = () => {
    const defaultState: CompletedParts =
    {
      personalInformation: false,
      companyInformation: false,
      uploadedFiles: false
    }
    return defaultState;
  }

  private _completedState: BehaviorSubject<CompletedParts> = new BehaviorSubject(this._createDefaultCompletedState());
  public readonly completedState: Observable<CompletedParts> = this._completedState.asObservable();

  public setCompletedState = (completedState: CompletedParts) => {
    this._completedState.next(completedState);
  }

  submitInformation(){
    if(!this._personalInformation || !this._companyInformation) return;
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
