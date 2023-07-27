import { Component, OnDestroy, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { error } from 'jquery';
import { Router } from '@angular/router';
import { Station } from '../Models/Station';
import { Emplacement } from '../Models/Emplacement';
import { Trajet } from '../Models/Trajet';
import { v4 as uuidv4 } from 'uuid';
import * as L from 'leaflet';
import { Subscription, interval } from 'rxjs';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent implements OnInit, OnDestroy {
  station: Station = new Station();
  borneInput: string = '';
  isFormSubmitted: boolean = false;
  private map!: L.Map;
  private userMarker!: L.Marker;
  private centroid: L.LatLngExpression = [34.016, 9.016]; // Tunisie
  private userIcon!: L.Icon;
  stations: Station[] = [];
  bornes: Borne[] = [];
  updateBadgeSubscription!: Subscription;
  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private router: Router
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  }

  ngOnInit(): void {
    this.initMap();
    this.getBorne();
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getPendingStations();
    });
  }
  showPosition(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.station.latitude = latitude;
    this.station.longitude = longitude;

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // Créer un marqueur pour la position de l'utilisateur
    this.userMarker = L.marker([latitude, longitude], {
      icon: this.userIcon,
      draggable: true, // Rendre le marqueur déplaçable
    }).addTo(this.map);

    // Mettre à jour la position du marqueur lorsque déplacé
    this.userMarker.on('dragend', (event) => {
      const marker = event.target;
      const newLatitude = marker.getLatLng().lat;
      const newLongitude = marker.getLatLng().lng;

      this.station.latitude = newLatitude;
      this.station.longitude = newLongitude;

      console.log('Nouvelle latitude:', newLatitude);
      console.log('Nouvelle longitude:', newLongitude);

      // Mettre à jour les coordonnées du marqueur

      // Centrer la carte sur la nouvelle position
      this.map.setView([newLatitude, newLongitude], 12);
    });

    // Utilisez les coordonnées pour centrer la carte sur la position de l'utilisateur
    this.map.setView([latitude, longitude], 12);
  }
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

  //validations

  resetStyleForm() {
    do {
      var errorList = document.getElementsByClassName('errorMessages');

      for (var i in errorList) {
        errorList[i].parentNode?.removeChild(errorList[i]);
      }
    } while (errorList && errorList.length > 0);

    var stationNameInput = document.getElementById('stationNameInput');
    if (stationNameInput) {
      stationNameInput.style.border = 'none';
    }

    var emplacementInput = document.getElementById('emplacementInput');
    if (emplacementInput) {
      emplacementInput.style.border = 'none';
    }

    var journeyInput = document.getElementById('journeyInput');
    if (journeyInput) {
      journeyInput.style.border = 'none';
    }

    var longitudeInput = document.getElementById('longitudeInput');
    if (longitudeInput) {
      longitudeInput.style.border = 'none';
    }

    var latitudeInput = document.getElementById('latitudeInput');
    if (latitudeInput) {
      latitudeInput.style.border = 'none';
    }

    var ouvertureInput = document.getElementById('ouvertureInput');
    if (ouvertureInput) {
      ouvertureInput.style.border = 'none';
    }

    var fermetureInput = document.getElementById('fermetureInput');
    if (fermetureInput) {
      fermetureInput.style.border = 'none';
    }
    var nomBorneInput = document.getElementById('nomBorneInput');
    if (nomBorneInput) {
      nomBorneInput.style.border = 'none';
    }
  }

  valideForm() {
    this.resetStyleForm();
    this.isFormSubmitted = true;

    const invalidFields = this.getInvalidFieldss();
    if (invalidFields.length === 0) {
      this.onSubmit();
    } else {
      invalidFields.forEach((field) => {
        let errorMessage = '';
        let inputElement: any;

        if (field === 'name') {
          errorMessage = !this.station.name
            ? 'Please enter a name'
            : 'Please enter a valid name';

          inputElement = document.getElementById('stationNameInput');
        } else if (field === 'emplacement') {
          errorMessage = !this.station.emplacement
            ? 'Please enter an emplacement'
            : 'Please enter a valid emplacement';
          inputElement = document.getElementById('emplacementInput');
        } else if (field === 'trajet') {
          errorMessage = !this.station.trajet
            ? 'Please enter a journey'
            : 'Please enter a valid journey';
          inputElement = document.getElementById('journeyInput');
        } else if (field === 'longitude') {
          errorMessage = 'Please enter a longitude';
          inputElement = document.getElementById('longitudeInput');
        } else if (field === 'latitude') {
          errorMessage = 'Please enter a latitude';
          inputElement = document.getElementById('latitudeInput');
        } else if (field === 'ouverture') {
          errorMessage = 'Please enter the Opening Time';
          inputElement = document.getElementById('ouvertureInput');
        } else if (field === 'fermeture') {
          errorMessage = 'Please enter the Closing Time';
          inputElement = document.getElementById('fermetureInput');
        } else if (field === 'nomBornes') {
          errorMessage = 'Please enter the name of borne';
          inputElement = document.getElementById('nomBorneInput');
        }
        // Add else if conditions for other fields

        if (errorMessage !== '' && inputElement && inputElement.parentNode) {
          const errorElement = document.createElement('div');
          errorElement.innerText = errorMessage;
          errorElement.classList.add('errorMessages');
          errorElement.style.color = 'red';

          inputElement.parentNode.appendChild(errorElement);
          inputElement.style.border = '1px solid red';
        }
      });
    }
  }
  //getinavlidFields pour le formulaire d'informations
  getInvalidFieldss(): string[] {
    const invalidFields: string[] = [];

    // Check for invalid name field
    if (!this.station.name || !/^[A-Za-z\s]+$/.test(this.station.name)) {
      invalidFields.push('name');
    }
    if (!this.station.emplacement || this.station.emplacement.length <= 0) {
      invalidFields.push('emplacement');
    }
    if (!this.station.trajet || this.station.trajet.length <= 0) {
      invalidFields.push('trajet');
    }

    // Check for invalid power field
    if (!this.station.longitude || isNaN(this.station.longitude)) {
      invalidFields.push('longitude');
    }

    // Check for invalid chargingTime field
    if (!this.station.latitude || isNaN(this.station.latitude)) {
      invalidFields.push('latitude');
    }
    // Check for invalid ouverture field
    if (
      !this.station.ouverture ||
      isNaN(new Date(this.station.ouverture).getTime())
    ) {
      invalidFields.push('ouverture');
    }
    if (
      !this.station.fermeture ||
      isNaN(new Date(this.station.fermeture).getTime())
    ) {
      invalidFields.push('fermeture');
    }
    /* if (
      !this.station.nomBornes ||
      !Array.isArray(this.station.nomBornes) ||
      this.station.nomBornes.length === 0 ||
      !this.station.nomBornes.every(
        (item) => typeof item === 'string' && /^[A-Za-z\s]+$/.test(item)
      )
    ) {
      invalidFields.push('nomBornes');
    }*/

    return invalidFields;
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 7,
    });
    this.userIcon = L.icon({
      iconUrl: 'assets/images/Map-Marker.png',
      iconSize: [32, 32], // taille de l'icône en pixels
    });
    const osmHotLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 7,
        attribution:
          '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
      }
    );
    const googleSatelliteLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution:
          'Map data &copy; <a href="https://www.google.com/">Google</a>',
      }
    );

    const cycloSMLayer = L.tileLayer(
      'https://tiles.opencyclemap.org/cycle/{z}/{x}/{y}.png',
      {
        attribution: 'Map data © OpenStreetMap contributors | CycloSM',
      }
    );

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }
    );

    const stamenTerrainLayer = L.tileLayer(
      'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      {
        maxZoom: 18,
        attribution:
          'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://openstreetmap.org/">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY SA</a>.',
      }
    );

    const baseMaps = {
      'OSM Hot': osmHotLayer,
      OpenStreetMap: osmLayer,
      'Google Satellite': googleSatelliteLayer,
      'Stamen Terrain': stamenTerrainLayer,
    };

    osmHotLayer.addTo(this.map); // Ajouter la couche OpenStreetMap par défaut
    L.control.layers(baseMaps).addTo(this.map);
  }

  ngOnDestroy(): void {
    if (this.updateBadgeSubscription) {
      this.updateBadgeSubscription.unsubscribe();
    }
  }

  getPendingStations(): void {
    this.stationService.getStationsWithPendingStatus().subscribe(
      (stations: Station[]) => {
        this.stations = stations;
        console.log('Stations with pending status:', this.stations);
      },
      (error) => {
        console.log(
          'Une erreur est survenue lors de la récupération des stations avec le statut "pending".',
          error
        );
      }
    );
  }

  getStationsLength(): number {
    return this.stations.length;
  }
  approuveStation(id: string) {
    this.router.navigate(['/ApprouvedStation', id]);
  }
  getBorne() {
    this.borneService.getBorneList().subscribe((data) => {
      this.bornes = data;
    });
  }
}
