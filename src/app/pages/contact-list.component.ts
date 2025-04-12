import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
  contact: Contact = { name: '', email: '', phone: '' };
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  onSubmit() {
    if (this.contact.id) {
      this.contactService.updateContact(this.contact.id, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    this.contact = { name: '', email: '', phone: '' };
  }

  editContact(contact: Contact) {
    this.contact = { ...contact };
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id);
  }
}
