import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';
import { StationService } from '../shared/services/station.service';
import { Station } from '../Models/Station';
import { Subscription, interval } from 'rxjs';
// import 'rs-Layer';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit, OnDestroy {
  stations: Station[] = [];
  updateBadgeSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getLatestApprovedStations();
    });
  }
  ngOnDestroy(): void {
    if (this.updateBadgeSubscription) {
      this.updateBadgeSubscription.unsubscribe();
    }
  }

  getLatestApprovedStations(): void {
    this.stationService.getLatestApprovedStations().subscribe(
      (data: Station[]) => {
        this.stations = data;
      },
      (error) => {
        console.error('Error fetching latest stations:', error);
      }
    );
  }
  getStationsLength(): number {
    return this.stations.length;
  }

  handleSearchClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/searchStation';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access denied.',
        text: 'You must be logged in to access this page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
  handleListClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/UtilisateurBorne';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access denied.',
        text: 'You must be logged in to access this page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
}
