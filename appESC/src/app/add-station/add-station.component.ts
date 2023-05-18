import { Component, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { error } from 'jquery';
import { Router } from '@angular/router';
import { Station } from '../Models/Station';
import { Emplacement } from '../Models/Emplacement';
import { Trajet } from '../Models/Trajet';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent implements OnInit {
  station: Station = {
    id: '',
    name: '',
    longitude: 0,
    latitude: 0,
    ouverture: new Date(),
    fermeture: new Date(),
    listeDeBornes: [],
    emplacement: {} as Emplacement,
    trajet: {} as Trajet,
    distance: 0,
  };
  constructor(private stationService: StationService, private router: Router) {}

  ngOnInit(): void {}
  addSation() {
    this.stationService.saveStation(this.station).subscribe((data) => {
      this.goToStationList();
    });
  }
  goToStationList() {
    this.router.navigate(['/admin']);
  }
}
