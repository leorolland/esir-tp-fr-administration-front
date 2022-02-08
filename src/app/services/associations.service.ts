import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Association } from '../types/Association';
import { BASE_URL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Association[]> {
    return this.http.get<Association[]>(`${BASE_URL}/associations`)
  }

  getByName(name: string): Observable<Association> {
    return this.http.get<Association>(`${BASE_URL}/associations/${name}`)
  }
  
}
