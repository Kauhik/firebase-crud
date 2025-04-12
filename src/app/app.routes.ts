import { Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { authGuard } from './guards/auth.guard';
import { DealPipelineComponent } from './pages/deal-pipeline.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pipeline', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'pipeline', pathMatch: 'full' },
  { path: 'pipeline', component: DealPipelineComponent, canActivate: [authGuard] },
];
