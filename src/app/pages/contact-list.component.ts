import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
  contact: Contact = { name: '', email: '', phone: '' };
  contacts: Contact[] = [];
  currentUser: User | null = null; // 👈 Track logged-in user

  constructor(
    private contactService: ContactService,
    private auth: AuthService,
    private router: Router
  ) {
    // 🔁 Load contacts
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });

    // 👤 Get logged-in user and log it
    this.auth.user$.subscribe((user) => {
      this.currentUser = user;
      console.log('🧠 Logged-in user:', user);
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

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
