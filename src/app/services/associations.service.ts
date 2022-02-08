import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Association } from '../types/Association';
import { BASE_URL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {
  deleteAssociation(name: string):Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/associations/${name}`)
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Association[]> {
    return this.http.get<Association[]>(`${BASE_URL}/associations`)
  }

  getByName(name: string): Observable<Association> {
    return this.http.get<Association>(`${BASE_URL}/associations/${name}`)
  }
  
}
