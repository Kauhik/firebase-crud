import { Component } from '@angular/core';
import { ContactListComponent } from './pages/contact-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactListComponent],
  template: `<app-contact-list></app-contact-list>`,
})
export class AppComponent {
  title = 'firebase-crud';
}
