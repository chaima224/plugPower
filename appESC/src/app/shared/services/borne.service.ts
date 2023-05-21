import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borne } from 'src/app/Models/Borne';

@Injectable({
  providedIn: 'root',
})
export class BorneService {
  private baseApi = 'http://localhost:8080/electricbornes';
  constructor(private http: HttpClient) {}

  getBorneList(): Observable<Borne[]> {
    return this.http.get<Borne[]>(`${this.baseApi}`);
  }
  saveBorne(borne: Borne): Observable<Object> {
    return this.http.post(`${this.baseApi}`, borne);
  }
  getBorneById(id: string): Observable<Borne> {
    return this.http.get<Borne>(`${this.baseApi}/${id}`);
  }
  updateBorne(id: string, borne: Borne): Observable<Object> {
    return this.http.put(`${this.baseApi}/${id}`, borne);
  }
  deleteBorne(id: string): Observable<Object> {
    return this.http.delete(`${this.baseApi}/${id}`);
  }
}
