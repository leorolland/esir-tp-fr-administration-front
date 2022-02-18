import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { User } from '../types/User';
import { BASE_URL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  deleteUser(id: number):Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/users/${id}`);
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/users`)
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/users/id/${id}`)
  }

  save(user: Partial<User>): Observable<User> {
    if (user.id) {
      return this.http.put<User>(`${BASE_URL}/users/${user.id}`, user)
    } else {
      return this.http.post<User>(`${BASE_URL}/users`, user)
    }
  }

  findId(firstname: string, lastname: string): Observable<number> {
    return this.http.get<User[]>(`${BASE_URL}/users`)
      // Keep only the corresponding user
      .pipe(map(users => users.filter(u => u.firstname == firstname && u.lastname == lastname)))
      // Return his id
      .pipe(map(filteredUsers => filteredUsers[0].id))
  }

}
