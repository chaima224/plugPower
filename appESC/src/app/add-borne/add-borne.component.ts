import { Component, OnInit } from '@angular/core';
import { Connecteur } from '../Models/Connecteur';
import { Mode } from '../Models/Mode';
import { Disponibilite } from '../Models/Disponibilite';
import { Borne } from '../Models/Borne';
import { Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-borne',
  templateUrl: './add-borne.component.html',
  styleUrls: ['./add-borne.component.scss'],
})
export class AddBorneComponent implements OnInit {
  borne: Borne = new Borne();
  isFormSubmitted: boolean = false;

  constructor(private borneService: BorneService, private router: Router) {}

  ngOnInit(): void {}
  addBorne() {
    this.borneService.saveBorne(this.borne).subscribe((data) => {
      this.goToBorneList();
    });
  }
  goToBorneList() {
    this.router.navigate(['/listborne']);
  }
  onSubmit() {
    this.addBorne();
  }

  resetStyleForm() {
    do {
      var errorList = document.getElementsByClassName('errorMessages');

      for (var i in errorList) {
        errorList[i].parentNode?.removeChild(errorList[i]);
      }
    } while (errorList && errorList.length > 0);

    var nameInput = document.getElementById('nameInput');
    if (nameInput) {
      nameInput.style.border = 'none';
    }

    var chargingTimeInput = document.getElementById('chargingTimeInput');
    if (chargingTimeInput) {
      chargingTimeInput.style.border = 'none';
    }

    var powerInput = document.getElementById('powerInput');
    if (powerInput) {
      powerInput.style.border = 'none';
    }

    var borneMode = document.getElementById('borneMode');
    if (borneMode) {
      borneMode.style.border = 'none';
    }

    var borneConnector = document.getElementById('borneConnector');
    if (borneConnector) {
      borneConnector.style.border = 'none';
    }
  }
  //form information
  validateForm() {
    this.resetStyleForm();
    this.isFormSubmitted = true;

    const invalidFields = this.getInvalidFields();
    if (invalidFields.length === 0) {
      this.onSubmit();
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
}
