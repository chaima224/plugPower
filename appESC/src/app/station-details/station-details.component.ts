import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { ActivatedRoute, Router } from '@angular/router';
import { StationService } from '../shared/services/station.service';
import { Borne } from '../Models/Borne';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
})
export class StationDetailsComponent implements OnInit {
  stations: Station[] = [];
  id!: string;
  station: Station = new Station();
  borne: Borne = new Borne();
  bornes: Borne[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private stationService: StationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getStationDetails();
    });
  }

  getStationDetails() {
    this.stationService.getStationById(this.id).subscribe(
      (data) => {
        this.station = data;
      },
      (error) => {
        console.error(error);
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
  getBorneDetails(id: string) {
    this.router.navigate(['/bornedetails', this.station.id, id]);
  }
}
