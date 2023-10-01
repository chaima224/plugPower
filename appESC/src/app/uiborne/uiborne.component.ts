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
  pagedStation: Station[] = [];
  autoHidePagination: boolean = true;
  itemsPerPage: number = 6;
  page: number = 1;
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
        this.updatePagedStation();
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
  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagedStation();
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagedStation();
    }
  }

  updatePagedStation() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedStation = this.stations.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.stations.length / this.itemsPerPage);
  }
}
