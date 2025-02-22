import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserListPage } from '../models/user-list-page.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number): Observable<UserListPage> {
    let params = new HttpParams()
    .set('_page', page)
    .set('_per_page', limit);
    
    return this.http.get<UserListPage>(this.apiUrl, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
