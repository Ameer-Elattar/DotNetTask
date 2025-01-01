import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = 'http://localhost:43034/api/Student';
  constructor(private http: HttpClient) {}

  getAllStudnets(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }
  createStudent(student: any): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}`, student);
  }
  getStudentById(stdId: any): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${stdId}`);
  }
  updateStudent(stdId: any, std: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${stdId}`, std);
  }
  deleteStudent(stdId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${stdId}`);
  }
  updateStudentSubjects(
    stdId: number,
    subjIds: Array<number>
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${stdId}/update-subjects`,
      subjIds
    );
  }
}
