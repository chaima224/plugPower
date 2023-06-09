import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Borne } from '../Models/Borne';
import { Station } from '../Models/Station';
import { AuthService } from '../shared/services/auth.service';
import { BorneService } from '../shared/services/borne.service';
import { BorneStationService } from '../shared/services/borneStation.service';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-search-station',
  templateUrl: './search-station.component.html',
  styleUrls: ['./search-station.component.scss'],
})
export class SearchStationComponent implements OnInit {
  borne: Borne = new Borne();
  stations: Station[] = [];
  station: Station = new Station();
  borneInput: string = '';
  isFormSubmitted: boolean = false;
  firstTabClicked = false;
  secondTabClicked = false;

  //  nameInput: any;

  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private authService: AuthService,
    private borneStationService: BorneStationService,
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
  goToStationsList(data: any) {
    this.router.navigate(['/resultSearch'], { state: { stations: data } });
  }

  changeTab(idTab: string) {
    document.getElementById(idTab)?.click();
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
  /* addBorne() {
    this.borneService.saveBorne(this.borne).subscribe((data) => {
      this.changeTab('tabLocation');
    });
  }*/

  searchStations(): void {
    this.stationService
      .rechercheStations(
        this.borne.puissance,
        this.borne.connecteur,
        this.borne.mode
      )
      .subscribe((stations) => {
        this.stations = stations;
        this.goToStationsList(stations);
      });
  }
  onSubmit() {
    this.searchStations();
  }

  logout(): void {
    // Call the logout method from the authentication service
    this.authService.logoutUser();

    // Additional tasks (optional)
    // Example: Clear local storage or reset user-related variables
    localStorage.clear();
    this.router.navigate(['/']);
    // ...
  }
}
