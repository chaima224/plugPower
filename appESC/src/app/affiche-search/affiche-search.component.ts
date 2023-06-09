import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { Borne } from '../Models/Borne';

@Component({
  selector: 'app-affiche-search',
  templateUrl: './affiche-search.component.html',
  styleUrls: ['./affiche-search.component.scss'],
})
export class AfficheSearchComponent implements OnInit {
  stations: Station[] = [];
  borne: Borne = new Borne();
  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.stations = history.state.stations;
  }
}
