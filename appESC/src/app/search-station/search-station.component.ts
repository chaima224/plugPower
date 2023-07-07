import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Borne } from '../Models/Borne';
import { Station } from '../Models/Station';
import { AuthService } from '../shared/services/auth.service';
import { BorneService } from '../shared/services/borne.service';
import { BorneStationService } from '../shared/services/borneStation.service';
import { StationService } from '../shared/services/station.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { AfficheSearchComponent } from '../affiche-search/affiche-search.component';

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
  private userMarker!: L.Marker;
  startLocation: string = '';
  endLocation: string = '';
  private map!: L.Map;
  startendData: any;

  //  nameInput: any;

  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private authService: AuthService,
    private borneStationService: BorneStationService,
    private router: Router,
    private afficheSearchComponent: AfficheSearchComponent
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
  goToStationsList(data: any, startendData: any) {
    this.router.navigate(['/resultSearch'], {
      state: { stations: data, startendData: startendData },
    });
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

  searchStations() {
    this.stationService
      .rechercheStations(
        this.borne.puissance,
        this.borne.connecteur,
        this.borne.mode
      )
      .subscribe((stations) => {
        this.stations = stations;
        this.searchRoute();
      });
  }
  async onSubmit() {
    await this.searchStations();

    console.log(this.stations);
    console.log(this.startendData);
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

  searchRoute(): void {
    console.log('searchRoute() called');
    console.log('startLocation:', this.startLocation);
    console.log('endLocation:', this.endLocation);

    if (this.startLocation.trim() !== '' && this.endLocation.trim() !== '') {
      const startSearchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        this.startLocation
      )}&format=json&addressdetails=1&limit=1`;

      const endSearchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        this.endLocation
      )}&format=json&addressdetails=1&limit=1`;

      Promise.all([fetch(startSearchUrl), fetch(endSearchUrl)])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
          const startData = data[0];
          const endData = data[1];

          if (startData.length > 0 && endData.length > 0) {
            const startResult = startData[0];
            const endResult = endData[0];

            const startLatitude = parseFloat(startResult.lat);
            const startLongitude = parseFloat(startResult.lon);
            const endLatitude = parseFloat(endResult.lat);
            const endLongitude = parseFloat(endResult.lon);

            const startPoint = L.latLng(startLatitude, startLongitude);
            const endPoint = L.latLng(endLatitude, endLongitude);
            this.startendData = {
              sLat: startLatitude,
              sLng: startLongitude,
              eLat: endLatitude,
              eLng: endLongitude,
            };
            this.goToStationsList(this.stations, this.startendData);
          } else {
            console.log(
              'Aucun résultat trouvé pour le point de départ ou la destination.'
            );
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log(
        'Veuillez entrer à la fois le point de départ et la destination.'
      );
    }
  }
}
