import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  updateRole(userId: number, associationName: string, name: string): Observable<any> {
    return this.http.put(`${BASE_URL}/roles`, {
      userId: userId,
      associationName: associationName,
      name: name
    })
  }
}
