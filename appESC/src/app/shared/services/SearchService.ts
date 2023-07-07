import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  startPoint!: L.LatLng;
  endPoint!: L.LatLng;

  constructor() {}
}
