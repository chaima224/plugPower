import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from 'src/app/Models/Evaluation ';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private uri = 'http://localhost:8080/evaluations';

  constructor(private http: HttpClient) {}

  saveEvaluation(
    stationId: string,
    evaluation: Evaluation
  ): Observable<Object> {
    return this.http.post(
      `${this.uri}/stations/${stationId}/comments`,
      evaluation
    );
  }
  getEvaluationsByStation(stationId: string): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.uri}/station/${stationId}`);
  }
}
