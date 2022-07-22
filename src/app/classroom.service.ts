import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from './models/classroom.model';


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Content-Type': 'application/json'
    })
  };

  private apiUrl = "https://localhost:5001/api/Classroom";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  add(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, { className: classroom.className }, this.httpOptions);
  }
}
