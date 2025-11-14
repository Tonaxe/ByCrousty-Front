import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // allow only if logged in and role === 'admin'
    if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      return true;
    }
    // otherwise redirect to login
    return this.router.parseUrl('/login');
  }
}
