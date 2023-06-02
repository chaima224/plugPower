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
}
