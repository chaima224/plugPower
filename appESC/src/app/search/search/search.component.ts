import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Borne } from 'src/app/Models/Borne';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/shared/services/station.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  divClass: string = 'custom-class';
  borne: Borne = new Borne();
  station: Station = new Station();
  stations: Station[] = [];
  puissance!: number;
  mode!: string;
  connecteur!: string;

  constructor(private router: Router, private stationService: StationService) {}

  ngOnInit(): void {}
  searchStations(): void {
    this.stationService
      .rechercheStations(this.puissance, this.mode, this.connecteur)
      .subscribe((stations) => (this.stations = stations));
  }

  setValue(value: string, type: string) {
    switch (type) {
      case 'emplacement':
        this.station.emplacement = value;
        break;

        console.log(this.station.emplacement);
      case 'trajet':
        this.station.trajet = value;
        break;
      case 'connecteur':
        this.borne.connecteur = value;
        break;
      case 'mode':
        this.borne.mode = value;
        break;
    }
  }
}
