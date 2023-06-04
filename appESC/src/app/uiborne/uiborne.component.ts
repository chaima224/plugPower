import { Component, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';
import { StationService } from '../shared/services/station.service';
import { Station } from '../Models/Station';

@Component({
  selector: 'app-uiborne',
  templateUrl: './uiborne.component.html',
  styleUrls: ['./uiborne.component.scss'],
})
export class UIBorneComponent implements OnInit {
  bornes: Borne[] = [];
  stations: Station[] = [];
  borne: Borne = new Borne();
  constructor(
    private borneService: BorneService,
    private stationService: StationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBornes();
    this.getStation();
  }

  getBornes() {
    this.borneService.getapprouvedBorne().subscribe(
      (data) => {
        this.bornes = data;
        console.log(data); // Vérifiez si les données sont correctement récupérées dans la console
      },
      (error) => {
        console.error(error); // Affichez les éventuelles erreurs dans la console
      }
    );
  }
  getBorneDetails(id: string) {
    this.router.navigate(['Borne-details', id]);
  }
  getStationDetails(id: string) {
    this.router.navigate(['Station-details', id]);
  }
  getStation() {
    this.stationService.getapprouvedStation().subscribe(
      (data) => {
        this.stations = data;
        console.log(data); // Vérifiez si les données sont correctement récupérées dans la console
      },
      (error) => {
        console.error(error); // Affichez les éventuelles erreurs dans la console
      }
    );
  }
}
