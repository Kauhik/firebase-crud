import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe],
  template: `
    <nav class="navbar">
      <a routerLink="/pipeline"> Pipeline</a>

      <ng-container *ngIf="!(auth.user$ | async); else loggedIn">
        <a routerLink="/login"> Login</a>
        <a routerLink="/register">Register</a>
      </ng-container>

      <ng-template #loggedIn>
        <span class="spacer"></span>
        <span class="user">
          👋 {{ (auth.user$ | async)?.displayName || (auth.user$ | async)?.email }}
          <button (click)="logout()">Logout</button>
        </span>
      </ng-template>
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
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']); 
    });
  }
}
