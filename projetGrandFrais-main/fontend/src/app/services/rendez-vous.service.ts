import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RendezVous } from '../models/rendez-vous';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private basrUrl = 'http://localhost:8082/api/rendezvous'

  constructor(private _http: HttpClient) { }

  getRendezVous(): Observable<RendezVous[]> {
    return this._http.get<RendezVous[]>(this.basrUrl + "/all");
  }



  // Méthode pour créer une consultation (ajoutez cette méthode si elle manque)
  createRendezVous(rendezvous: any): Observable<RendezVous> {
    return this._http.post<RendezVous>(this.basrUrl + "/create", rendezvous);
  }

  updateRendezVous(id: number, rendezvous: RendezVous): Observable<RendezVous> {
    return this._http.put(this.basrUrl + "/" + id, rendezvous);
  }

  deleteRendezVous(id: number): Observable<RendezVous> {
    return this._http.delete(this.basrUrl + "/" + id);
  }
}
