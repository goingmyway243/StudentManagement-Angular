import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Content-Type': 'application/json'
    })
  };

  private apiUrl: string = 'https://localhost:5001/api/Student';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: string): Observable<Student> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(getUrl);
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, this.httpOptions);
  }

  update(student: Student): Observable<Student> {
    let putUrl = `${this.apiUrl}/${student.id}`;
    return this.http.put<Student>(putUrl, student, this.httpOptions);
  }

  delete(id: string): Observable<Student> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<Student>(deleteUrl, this.httpOptions);
  }
}
