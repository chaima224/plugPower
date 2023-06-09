import {
  Component,
  OnInit,
  VERSION,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { Router } from '@angular/router';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';
import { AuthService } from '../shared/services/auth.service';
import { BorneStationService } from '../shared/services/borneStation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as L from 'leaflet';

@Component({
  selector: 'app-borne',
  templateUrl: './borne.component.html',
  styleUrls: ['./borne.component.scss'],
})
export class BorneComponent implements OnInit {
  borne: Borne = new Borne();
  station: Station = new Station();
  borneInput: string = '';
  isFormSubmitted: boolean = false;
  firstTabClicked = false;
  secondTabClicked = false;
  private map!: L.Map;
  private userMarker!: L.Marker;
  private centroid: L.LatLngExpression = [34.016, 9.016]; // Tunisie
  private userIcon!: L.Icon;

  //  nameInput: any;

  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private authService: AuthService,
    private borneStationService: BorneStationService,
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

  ngOnInit(): void {
    this.initMap();
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

  add() {
    this.borneStationService
      .save(this.station, this.borne)
      .subscribe((data) => {
        Swal.fire(
          'Succes!',
          'The station has been successfully added. It is pending approval from the administrator.!',
          'success'
        );
      });
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

  resetStyleForm() {
    do {
      var errorList = document.getElementsByClassName('errorMessages');

      for (var i in errorList) {
        errorList[i].parentNode?.removeChild(errorList[i]);
      }
    } while (errorList && errorList.length > 0);

    document.getElementById('nameInput')!.style.border = 'none';
    document.getElementById('chargingTimeInput')!.style.border = 'none';
    document.getElementById('powerInput')!.style.border = 'none';
    document.getElementById('borneMode')!.style.border = 'none';
    document.getElementById('borneConnector')!.style.border = 'none';
    document.getElementById('descriptionInput')!.style.border = 'none';
    document.getElementById('stationNameInput')!.style.border = 'none';
    document.getElementById('emplacementInput')!.style.border = 'none';
    document.getElementById('journeyInput')!.style.border = 'none';
    document.getElementById('longitudeInput')!.style.border = 'none';
    document.getElementById('latitudeInput')!.style.border = 'none';
    document.getElementById('ouvertureInput')!.style.border = 'none';
    document.getElementById('fermetureInput')!.style.border = 'none';
  }
  //form information
  validateForm() {
    this.resetStyleForm();
    this.isFormSubmitted = true;

    const invalidFields = this.getInvalidFields();
    if (invalidFields.length === 0) {
      this.changeTab('descriptionTab');
    } else {
      invalidFields.forEach((field) => {
        let errorMessage = '';
        let inputElement: any;

        if (field === 'name') {
          errorMessage = !this.borne.name
            ? 'Please enter a name'
            : 'Please enter a valid name';

          inputElement = document.getElementById('nameInput'); // Replace 'nameInput' with the actual ID of the name input element
        } else if (field === 'power') {
          errorMessage = !this.borne.puissance
            ? 'Please enter a power'
            : 'Please enter a valid power';
          inputElement = document.getElementById('powerInput'); // Replace 'powerInput' with the actual ID of the power input element
        } else if (field === 'chargingTime') {
          errorMessage = !this.borne.tempsCharge
            ? 'Please enter a ChargingTime'
            : 'Please enter a valid ChargingTime';
          inputElement = document.getElementById('chargingTimeInput'); // Replace 'chargingTimeInput' with the actual ID of the chargingTime input element
        } else if (field === 'mode') {
          errorMessage = 'Please enter a mode';
          inputElement = document.getElementById('borneMode'); // Replace 'chargingTimeInput' with the actual ID of the chargingTime input element
        } else if (field === 'connector') {
          errorMessage = 'Please enter a connector';
          inputElement = document.getElementById('borneConnector'); // Replace 'chargingTimeInput' with the actual ID of the chargingTime input element
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
  //form description
  validForm() {
    this.resetStyleForm();
    this.isFormSubmitted = true;

    const invalidFields = this.getInvalidField();
    if (invalidFields.length === 0) {
      this.changeTab('tabLocation');
    } else {
      invalidFields.forEach((field) => {
        let errorMessage = '';
        let inputElement: any;

        if (field === 'description') {
          errorMessage = !this.borne.description
            ? 'Please enter a description'
            : 'Please enter a valid description';

          inputElement = document.getElementById('descriptionInput'); // Replace 'nameInput' with the actual ID of the name input element
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
  getInvalidFields(): string[] {
    const invalidFields: string[] = [];

    // Check for invalid name field
    if (!this.borne.name || !/^[A-Za-z\s]+$/.test(this.borne.name)) {
      invalidFields.push('name');
    }

    // Check for invalid power field
    if (!this.borne.puissance || isNaN(this.borne.puissance)) {
      invalidFields.push('power');
    }

    // Check for invalid chargingTime field
    if (!this.borne.tempsCharge || isNaN(this.borne.tempsCharge)) {
      invalidFields.push('chargingTime');
    }

    if (!this.borne.mode || this.borne.mode.length <= 0) {
      invalidFields.push('mode');
    }
    if (!this.borne.connecteur || this.borne.connecteur.length <= 0) {
      invalidFields.push('connector');
    }

    return invalidFields;
  }
  //getinavlidFields pour le formulaire de description
  getInvalidField(): string[] {
    const invalidFields: string[] = [];

    if (!this.borne.description || this.borne.description.length <= 0) {
      invalidFields.push('description');
    }

    return invalidFields;
  }

  valideForm() {
    this.resetStyleForm();
    this.isFormSubmitted = true;

    const invalidFields = this.getInvalidFieldss();
    if (invalidFields.length === 0) {
      this.add();
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
    return invalidFields;
  }
  thirdTabClicked() {
    if (this.firstTabClicked && this.secondTabClicked) {
      // Exécutez votre logique pour le click de la troisième tab ici
      this.valideForm();
    }
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
}
