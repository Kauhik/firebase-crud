// services/deal.service.ts
import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Deal } from '../models/deal.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DealService {
  private firestore = inject(Firestore);
  private dealsRef = collection(this.firestore, 'deals');

  getDealsForUser(userId: string): Observable<Deal[]> {
    const q = query(this.dealsRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Deal[]>;
  }

  addDeal(deal: Deal) {
    return addDoc(this.dealsRef, deal);
  }

  updateDealStage(dealId: string, newStage: Deal['stage']) {
    const dealDoc = doc(this.firestore, `deals/${dealId}`);
    return updateDoc(dealDoc, { stage: newStage });
  }

  deleteDeal(dealId: string) {
    const dealDoc = doc(this.firestore, `deals/${dealId}`);
    return deleteDoc(dealDoc);
  }
}
