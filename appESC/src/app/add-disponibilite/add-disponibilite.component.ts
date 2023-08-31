import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { Router } from '@angular/router';
import { StationService } from '../shared/services/station.service';
import { BorneService } from '../shared/services/borne.service';
import { Borne } from '../Models/Borne';
import { DisBorne, DisStation, Disponibilite } from '../Models/Disponibilite';
import { DisponibiliteService } from '../shared/services/Disponibilite.service';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-add-disponibilite',
  templateUrl: './add-disponibilite.component.html',
  styleUrls: ['./add-disponibilite.component.scss'],
})
export class AddDisponibiliteComponent implements OnInit {
  station: Station[] = [];
  stations: Station = new Station();

  disponibilite: Disponibilite = new Disponibilite();

  selectedStation?: Station;
  isFormSubmitted: boolean = false;

  constructor(
    private stationService: StationService,
    private borneService: BorneService,
    private disponibiliteService: DisponibiliteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.disponibilite.borne = new DisBorne();
    this.disponibilite.station = new DisStation();
    this.getStation();
    this.authService.userInfo.subscribe((value) => {
      if (value) {
        this.user.id = value.userid;
        this.user.prenom = value.prenom;
        this.user.username = value.username;
      }
    });
  }
  user = {
    username: '',
    id: '',
    prenom: '',
    nom: '',
  };
  getStation() {
    this.stationService.getapprouvedStation().subscribe((data) => {
      this.station = data;
    });
  }

  setValue(value: string, type: string) {
    switch (type) {
      case 'etat':
        this.disponibilite.etat = value; // Mettre à jour la valeur sélectionnée
        break;
      default:
        break;
    }
  }
  addDisponibilite() {
    this.disponibiliteService
      .saveDisponibilite(this.disponibilite)
      .subscribe((data) => {
        Swal.fire('Succes!', 'success');
      });
  }
  goToStationList() {
    this.router.navigate(['/liststation']);
  }
  onSubmit() {
    this.addDisponibilite();
  }
  /*onStationChange(event: any) {
    const selectedStationId = event.target.value;
    // Perform any desired actions with the selected station ID
    console.log('Selected Station ID:', selectedStationId);
  }*/
  onStationChange(event: any) {
    const selectedStationId = event.target.value;
    this.selectedStation = this.station.find(
      (st: Station) => st.id === selectedStationId
    );

    if (this.selectedStation) {
      this.disponibilite.station.id = this.selectedStation.id;
      // Assurez-vous que les bornes de la station sélectionnée sont correctement définies dans la propriété nomBorne
      this.disponibilite.borne.id =
        this.selectedStation.bornes.length > 0
          ? this.selectedStation.bornes[0].id
          : ''; // Affectez la première borne par défaut, ou ajustez la logique selon vos besoins
    }
  }

  //validations

  resetStyleForm() {
    do {
      var errorList = document.getElementsByClassName('errorMessages');

      for (var i in errorList) {
        errorList[i].parentNode?.removeChild(errorList[i]);
      }
    } while (errorList && errorList.length > 0);

    var nomStationInput = document.getElementById('nomStationInput');
    if (nomStationInput) {
      nomStationInput.style.border = 'none';
    }
    var nomBorneInput = document.getElementById('nomBorneInput');
    if (nomBorneInput) {
      nomBorneInput.style.border = 'none';
    }
    var etatInput = document.getElementById('etatInput');
    if (etatInput) {
      etatInput.style.border = 'none';
    }
    var dateDebutInput = document.getElementById('dateDebutInput');
    if (dateDebutInput) {
      dateDebutInput.style.border = 'none';
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

        if (field === 'nomStation') {
          errorMessage = !this.disponibilite.station.id
            ? 'Please enter a name of station'
            : 'Please enter a valid name';

          inputElement = document.getElementById('nomStationInput');
        }

        if (field === 'nomBorne') {
          errorMessage = !this.disponibilite.borne.id
            ? 'Please enter a name of borne'
            : 'Please enter a valid name';

          inputElement = document.getElementById('nomBorneInput');
        }
        if (field === 'etat') {
          errorMessage = !this.disponibilite.etat
            ? 'Please enter the status '
            : 'Please enter a valid name';

          inputElement = document.getElementById('etatInput');
        }
        if (field === 'dateDebut') {
          errorMessage = 'Please enter the Start date ';

          inputElement = document.getElementById('dateDebutInput');
        }
        if (field === 'dateFin') {
          errorMessage = 'Please enter the Start date ';

          inputElement = document.getElementById('dateFinInput');
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

    if (
      !this.disponibilite.station.id ||
      this.disponibilite.station.id.length <= 0
    ) {
      invalidFields.push('nomStation');
    }
    if (
      !this.disponibilite.borne.id ||
      this.disponibilite.borne.id.length <= 0
    ) {
      invalidFields.push('nomBorne');
    }
    if (!this.disponibilite.etat || this.disponibilite.etat.length <= 0) {
      invalidFields.push('etat');
    }

    if (
      (!this.disponibilite.dateDebut ||
        isNaN(new Date(this.disponibilite.dateDebut).getTime())) &&
      this.disponibilite.etat == 'Unavailable'
    ) {
      invalidFields.push('dateDebut');
    }
    if (
      (!this.disponibilite.dateFin ||
        isNaN(new Date(this.disponibilite.dateFin).getTime())) &&
      this.disponibilite.etat == 'Unavailable'
    ) {
      invalidFields.push('dateFin');
    }
    return invalidFields;
  }
}
