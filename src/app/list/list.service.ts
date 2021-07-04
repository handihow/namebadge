import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import InformationItem from '../models/information.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private db: AngularFirestore) { }

  async getList(): Promise<InformationItem[]> {
    const queryStr = (ref) => ref.orderBy('updatedAt', 'desc');
    const snap = await 
      this.db.collection('information', queryStr)
      .get()
      .toPromise();
    if (snap.empty) return [];
    return snap.docs.map(doc => {
      const data = doc.data() as InformationItem;
      const id = doc.id;
      return { id, ...data };
    });
  }

  async getItem(id: string): Promise<InformationItem> {
    const snap = await this.db.collection('information').doc(id).get().toPromise();
    if (!snap.exists) return null;
    return { id: snap.id, ...snap.data() as InformationItem };
  }

}
