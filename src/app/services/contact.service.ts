import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firestore: Firestore = inject(Firestore);
  private contactsRef = collection(this.firestore, 'contacts');

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  getContact(id: string): Observable<Contact> {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return docData(contactDoc, { idField: 'id' }) as Observable<Contact>;
  }

  addContact(contact: Contact) {
    return addDoc(this.contactsRef, contact);
  }

  updateContact(id: string, contact: Partial<Contact>) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return updateDoc(contactDoc, contact);
  }

  deleteContact(id: string) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDoc);
  }
}
