import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import PersonalInformation from '../models/personalInfo.model';
import CompanyInformation from '../models/companyInfo.model';
import UCFile from '../models/file.model';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private _personalInformation: PersonalInformation;
  private _companyInformation: CompanyInformation;
  private _filesInformation: UCFile[] = [];

  constructor(private db: AngularFirestore) { }

  private _completedPersonalInformation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly completedPersonalInformation: Observable<boolean> = this._completedPersonalInformation.asObservable();

  public setCompletedPersonalInformation = (completed: boolean) => {
    this._completedPersonalInformation.next(completed);
  }

  private _completedCompanyInformation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly completedCompanyInformation: Observable<boolean> = this._completedCompanyInformation.asObservable();

  public setCompletedCompanyInformation = (completed: boolean) => {
    this._completedCompanyInformation.next(completed);
  }

  private _addedFilesInformation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly addedFilesInformation: Observable<boolean> = this._addedFilesInformation.asObservable();

  public setAddedFilesInformation = (completed: boolean) => {
    this._addedFilesInformation.next(completed);
  }

  getPersonalInformation() {
    return this._personalInformation;
  }

  setPersonalInformation(personalInfo: PersonalInformation){
    this._personalInformation = personalInfo;
    this.setCompletedPersonalInformation(true);
  }

  getCompanyInformation() {
    return this._companyInformation;
  }

  setCompanyInformation(companyInfo: CompanyInformation) {
    this._companyInformation = companyInfo;
    this.setCompletedCompanyInformation(true);
  }

  getFileInformation(){
    return this._filesInformation;
  }

  addFileInformation(fileInfo: UCFile){
    this._filesInformation.push(fileInfo);
    this.setAddedFilesInformation(true);
  }

  clearFileInformation(){
    this._filesInformation = [];
    this.setAddedFilesInformation(false);
  }

  async submitInformation(){
    if(!this._personalInformation || !this._companyInformation) return null;
    try {
      const doc = await this.db.collection('information').add({
        personalInfo: this._personalInformation,
        companyInfo: this._companyInformation,
        files: this._filesInformation,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return doc.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

}
