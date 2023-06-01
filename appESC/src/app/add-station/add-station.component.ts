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
  isFormSubmitted: boolean = false;
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
}
