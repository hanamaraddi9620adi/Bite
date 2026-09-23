import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse { token: string; fullName: string; email: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  constructor(private readonly http: HttpClient) {}
  signup(fullName: string, email: string, password: string): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { fullName, email, password }).pipe(tap(response => this.store(response))); }
  login(email: string, password: string): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(tap(response => this.store(response))); }
  private store(response: AuthResponse) { localStorage.setItem('bite_token', response.token); localStorage.setItem('bite_user', JSON.stringify({ fullName: response.fullName, email: response.email })); }
}
