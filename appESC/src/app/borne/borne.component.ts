import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { Router } from '@angular/router';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-borne',
  templateUrl: './borne.component.html',
  styleUrls: ['./borne.component.scss'],
})
export class BorneComponent implements OnInit {
  borne: Borne = new Borne();
  station: Station = new Station();
  borneInput: string = '';
  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private router: Router
  ) {}

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
  addBorne() {
    this.borneService.saveBorne(this.borne).subscribe((data) => {
      this.goToBorneList();
    });
  }
  goToBorneList() {
    this.router.navigate(['/listborne']);
  }
  onSubmit2() {
    this.addBorne();
  }
}
