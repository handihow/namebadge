import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FinishedService {

  private _docId: string;

  constructor(private db: AngularFirestore) { }

  getDocId() {
    return this._docId;
  }

  setDocId(id: string){
    this._docId = id;
  }

  checkEmailStatus(docId: string){
    return this.db.collection('information').doc(docId).valueChanges();
  }
}
