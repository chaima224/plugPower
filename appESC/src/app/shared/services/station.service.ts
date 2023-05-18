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
    return this.http.get<Station[]>(`${this.baseUrl}`);
  }
  saveStation(station: Station): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, station);
  }
  updateStation(id: number, station: Station): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, station);
  }
  deleteStation(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
