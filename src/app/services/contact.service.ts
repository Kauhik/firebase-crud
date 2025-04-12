import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  docData,
  query,
  where
} from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firestore: Firestore = inject(Firestore);
  private contactsRef = collection(this.firestore, 'contacts');

  /**
   *  Get contacts for a specific user
   */
  getContactsByUser(userId: string): Observable<Contact[]> {
    const contactsQuery = query(
      this.contactsRef,
      where('userId', '==', userId)
    );
    return collectionData(contactsQuery, { idField: 'id' }) as Observable<Contact[]>;
  }

  /**
   *  Get a single contact by ID
   */
  getContact(id: string): Observable<Contact> {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return docData(contactDoc, { idField: 'id' }) as Observable<Contact>;
  }

  /**
   *  Add a new contact with userId included
   */
  addContact(contact: Contact, userId: string) {
    return addDoc(this.contactsRef, {
      ...contact,
      userId,
    });
  }

  /**
   *  Update an existing contact
   */
  updateContact(id: string, contact: Partial<Contact>) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return updateDoc(contactDoc, contact);
  }

  /**
   *  Delete a contact
   */
  deleteContact(id: string) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDoc);
  }
}
