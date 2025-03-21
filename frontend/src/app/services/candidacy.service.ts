import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidacy } from '../models/candidacy.model';
@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  private apiUrl = 'http://localhost:8080/candidacies';

  constructor(private http: HttpClient) {}

  getCandidacy(): Observable<Candidacy[]> {
    return this.http.get<Candidacy[]>(this.apiUrl);
  }

  getCandidacyById(id: number): Observable<Candidacy> {
    return this.http.get<Candidacy>(`${this.apiUrl}/${id}`);
  }

  createCandidacy(candidacy: Candidacy): Observable<Candidacy> {
    return this.http.post<Candidacy>(this.apiUrl, candidacy);
  }

  updateCandidacy(id: number, candidacy: Candidacy): Observable<Candidacy> {
    return this.http.put<Candidacy>(`${this.apiUrl}/${id}`, candidacy);
  }  

  deleteCandidacy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
