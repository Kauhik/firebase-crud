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
  currentUser: User | null = null;

  constructor(
    private contactService: ContactService,
    private auth: AuthService,
    private router: Router
  ) {
    // Get logged-in user
    this.auth.user$.subscribe((user) => {
      this.currentUser = user;

      if (user) {
        // Load only this user's contacts
        this.contactService.getContactsByUser(user.uid).subscribe((data) => {
          this.contacts = data;
        });
      }
    });
  }

  onSubmit() {
    if (!this.currentUser) return;

    if (this.contact.id) {
      this.contactService.updateContact(this.contact.id, this.contact);
    } else {
      this.contactService.addContact(this.contact, this.currentUser.uid);
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
