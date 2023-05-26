import { Component, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { error } from 'jquery';
import { Router } from '@angular/router';
import { Station } from '../Models/Station';
import { Emplacement } from '../Models/Emplacement';
import { Trajet } from '../Models/Trajet';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent implements OnInit {
  station: Station = new Station();
  borneInput: string = '';
  constructor(private stationService: StationService, private router: Router) {}

  ngOnInit(): void {}
  addStation() {
    this.station.nomBornes.push(this.borneInput);
    this.borneInput = '';
    this.stationService.saveStation(this.station).subscribe((data) => {
      this.goToStationList();
    });
  }
  goToStationList() {
    this.router.navigate(['/liststation']);
  }
  onSubmit() {
    this.addStation();
  }
}
