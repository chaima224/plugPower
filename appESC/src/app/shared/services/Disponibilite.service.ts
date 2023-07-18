import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disponibilite } from 'src/app/Models/Disponibilite';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DisponibiliteService {
  private Url = 'http://localhost:8080/disponibilites';
  constructor(private http: HttpClient) {}

  saveDisponibilite(disponibilite: Disponibilite): Observable<Object> {
    return this.http.post(`${this.Url}/dispo`, disponibilite);
  }

  getDisponibiliteByStationAndBorne(
    stationId: string,
    borneId: string
  ): Observable<Disponibilite[]> {
    const url = `${this.Url}/${stationId}/${borneId}`;
    return this.http.get<Disponibilite[]>(url);
  }
}
