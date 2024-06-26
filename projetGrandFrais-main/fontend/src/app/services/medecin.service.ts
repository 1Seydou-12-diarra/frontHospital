import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from '../models/personne';
import { Observable, catchError } from 'rxjs';
import { Medecin } from '../models/medecin.model';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private basrUrl = 'http://localhost:8082/medecins'

  constructor(private _http : HttpClient) { }

  getMedecin() : Observable<Medecin[]> {
    return this._http.get<Medecin[]>(this.basrUrl+"/all");
  }

  createMedecin(medecin : Medecin): Observable<Personne> {
    return this._http.post(this.basrUrl+"/creat", medecin);
  }

  updatMedecin(id: number, medecin: Medecin): Observable<Personne> {
    return this._http.put(this.basrUrl +"/"+id, medecin);
  }

  deleteMedecin(id:number) : Observable<Medecin>{
    return this._http.delete(this.basrUrl +"/"+ id);
  }
}



  

