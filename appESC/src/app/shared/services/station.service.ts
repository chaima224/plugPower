import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/Models/Station';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private baseUrl = 'http://localhost:8080/electricStations';

  constructor(private http: HttpClient) {}
  getStationList(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/stations`);
  }
  getStationById(id: string): Observable<Station> {
    return this.http.get<Station>(`${this.baseUrl}/${id}`);
  }
  saveStation(station: Station): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addStation`, station);
  }
  updateStation(id: string, station: Station): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, station);
  }
  approuveStation(id: string, station: Station): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, station);
  }
  deleteStation(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getapprouvedStation(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/stationsApprouved`);
  }
  rechercheStations(
    puissance?: number,
    connecteur?: string,
    mode?: string
  ): Observable<Station[]> {
    let url = `${this.baseUrl}/rechercheStation?`;
    if (puissance) {
      url += `puissance=${puissance}&`;
    }
    if (connecteur) {
      url += `connecteur=${connecteur}&`;
    }
    if (mode) {
      url += `mode=${mode}&`;
    }
    return this.http.get<Station[]>(url);
  }

  getAllStationsCoordinates(): Observable<Station[]> {
    const url = `${this.baseUrl}/coordinate`;
    return this.http.get<Station[]>(url);
  }

  getStationsByMode(mode: string): Observable<Station[]> {
    const url = `${this.baseUrl}/mode/${mode}`;
    return this.http.get<Station[]>(url);
  }
  getStationsWithPendingStatus(): Observable<Station[]> {
    const url = `${this.baseUrl}/pending`;
    return this.http.get<Station[]>(url);
  }
  getLatestApprovedStations(): Observable<Station[]> {
    const url = `${this.baseUrl}/latest-approved-stations`;
    return this.http.get<Station[]>(url);
  }
}
