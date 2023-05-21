import { Component, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { data } from 'jquery';
import { Station } from '../Models/Station';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-station',
  templateUrl: './list-station.component.html',
  styleUrls: ['./list-station.component.scss'],
})
export class ListStationComponent implements OnInit {
  station: Station[] = [];
  constructor(private stationService: StationService, private router: Router) {}

  ngOnInit(): void {
    this.getStation();
  }
  getStation() {
    this.stationService.getStationList().subscribe((data) => {
      this.station = data;
    });
  }
  updateStation(id: string) {
    this.router.navigate(['/updatestation', id]);
  }
  deleteStation(id: string) {
    this.stationService.deleteStation(id).subscribe((data) => {
      this.getStation();
    });
  }
}
