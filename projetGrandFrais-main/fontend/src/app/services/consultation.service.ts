import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Consultation } from '../models/consultation.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private basrUrl = 'http://localhost:8082/consultations'

  constructor(private _http: HttpClient) { }

  getConsultation(): Observable<Consultation[]> {
    return this._http.get<Consultation[]>(this.basrUrl + "/all");
  }



  // Méthode pour créer une consultation (ajoutez cette méthode si elle manque)
  createConsultation(consultation: Consultation): Observable<Consultation> {
    return this._http.post<Consultation>(this.basrUrl + "/creat", consultation);
  }

  updateConsultation(id: number, consultation: Consultation): Observable<Consultation> {
    return this._http.put(this.basrUrl + "/" + id, consultation);
  }

  deleteConsultation(id: number): Observable<Consultation> {
    return this._http.delete(this.basrUrl + "/" + id);
  }
}
