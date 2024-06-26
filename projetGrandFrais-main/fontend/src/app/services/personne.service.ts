import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from '../models/personne';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {

  private basrUrl = 'http://localhost:8082/patients'

  constructor(private _http : HttpClient) { }

  getPersonnes() : Observable<Personne[]> {
    return this._http.get<Personne[]>(this.basrUrl+"/all");
  }

  createPersonne(personne : Personne): Observable<Personne> {
    return this._http.post(this.basrUrl+"/creat", personne);
  }

  updatePersonne(id: number, personne: Personne): Observable<Personne> {
    return this._http.put(this.basrUrl +"/"+id, personne);
  }

  deletePersonne(id:number) : Observable<Personne>{
    return this._http.delete(this.basrUrl +"/"+ id);
  }
}
