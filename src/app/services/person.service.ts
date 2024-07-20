import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './generic.service';
import { PersonRequest } from '../models/person-request.model';
import { PersonResponse } from '../models/person-response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends ApiService<PersonRequest, number> {
    
  constructor(http: HttpClient) {
    super(http, 'persons', {});
  }

  override add(person: PersonRequest): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(`${this.baseURL}/${this.path}`, person, this.options());
  }

 
  override findAll(): Observable<PersonResponse[]> {
    return this.http.get<PersonResponse[]>(`${this.baseURL}/${this.path}`, this.options());
  }

 
  override findById(id: number): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.baseURL}/${this.path}/${id}`, this.options());
  }


  override update(id: number, person: PersonRequest): Observable<PersonResponse> {
    return this.http.put<PersonResponse>(`${this.baseURL}/${this.path}/${id}`, person, this.options());
  }


  override delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${this.path}/${id}`, this.options());
  }
}