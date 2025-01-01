import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private baseUrl = 'http://localhost:43034/api/Subject';
  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}`);
  }
  createSubject(Subject: any): Observable<Subject> {
    return this.http.post<Subject>(`${this.baseUrl}`, Subject);
  }
  getSubjectById(subId: any): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/${subId}`);
  }
  updateSubject(subId: any, sub: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${subId}`, sub);
  }
  deleteSubject(subId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${subId}`);
  }
}
