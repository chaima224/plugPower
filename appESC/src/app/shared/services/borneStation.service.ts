import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borne } from 'src/app/Models/Borne';
import { Station } from 'src/app/Models/Station';

@Injectable({
  providedIn: 'root',
})
export class BorneStationService {
  private Api = 'http://localhost:8080/electricStations/add';
  constructor(private http: HttpClient) {}
  save(station: Station, borne: Borne): Observable<Object> {
    const stationRequest = { station, borne }; // Création de l'objet contenant la station et la borne
    return this.http.post(`${this.Api}`, stationRequest);
  }
}
