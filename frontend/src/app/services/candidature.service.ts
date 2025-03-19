import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Candidature {
  id?: number;
  entreprise: string;
  poste: string;
  statut: string;
  lien?: string;
  recruteur?: string;
  stack?: string;
  dateEntretien?: string;
  numeroEntretien?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/candidatures'; // Assure-toi que ton backend Spring Boot tourne

  constructor(private http: HttpClient) {}

  /** 🔄 Récupérer toutes les candidatures */
  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  /** ➕ Ajouter une nouvelle candidature */
  ajouterCandidature(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.apiUrl, candidature);
  }

  modifierCandidature(id: number, candidature: Candidature): Observable<Candidature> {
    return this.http.put<Candidature>(`${this.apiUrl}/${id}`, candidature);
  }  
  
  /** ❌ Supprimer une candidature */
  supprimerCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
