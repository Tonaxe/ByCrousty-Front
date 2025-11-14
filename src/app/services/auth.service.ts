import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // Call backend login endpoint. Expects { email, password } -> { user, token }
  login(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/login`;
    return this.http.post(url, { email, password });
  }

  // Token helpers (simple localStorage-based)
  setToken(token: string) {
    localStorage.setItem('api_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('api_token');
  }

  clearToken() {
    localStorage.removeItem('api_token');
  }

  // User helpers
  setUser(user: any) {
    try {
      localStorage.setItem('api_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to store user in localStorage', e);
    }
  }

  getUser(): any | null {
    const raw = localStorage.getItem('api_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse stored user', e);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return !!user && user.role === 'admin';
  }

  logout() {
    this.clearToken();
    localStorage.removeItem('api_user');
  }

  /**
   * Validate session by fetching current user from the API.
   * If successful, store/refresh the user and return true.
   * On error (unauthorized, server error) it will clear stored credentials and return false.
   */
  checkSession(): Observable<boolean> {
    const url = `${environment.apiUrl}/api/v1/user`;
    return this.http.get<any>(url).pipe(
      tap((res) => {
        // backend returns the user object
        if (res) {
          this.setUser(res);
        }
      }),
      map(() => true),
      catchError((err) => {
        // on any error we clear credentials
        this.logout();
        return of(false);
      })
    );
  }
}
