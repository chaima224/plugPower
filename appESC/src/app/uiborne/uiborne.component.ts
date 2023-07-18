import { Component, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';
import { StationService } from '../shared/services/station.service';
import { Station } from '../Models/Station';
import { AuthService } from '../shared/services/auth.service';

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
    private authService: AuthService,
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
    this.router.navigate(['/bornedetails', id]);
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
