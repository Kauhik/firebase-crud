import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe],
  template: `
    <nav class="navbar">
      <a routerLink="/pipeline">🏠 Pipeline</a>
      <a routerLink="/login">🔐 Login</a>
      <a routerLink="/register">🆕 Register</a>

      <span class="spacer"></span>

      <span *ngIf="(auth.user$ | async) as user">
        👋 {{ user.displayName || user.email }}
        <button (click)="logout()">Logout</button>
      </span>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background: #1e1e2f;
      color: white;
      padding: 10px;
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .navbar a {
      color: white;
      text-decoration: none;
    }
    .navbar .spacer {
      flex-grow: 1;
    }
    .navbar button {
      background: #ff4d4d;
      border: none;
      color: white;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
