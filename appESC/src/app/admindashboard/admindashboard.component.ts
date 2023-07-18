import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { StationService } from '../shared/services/station.service';
import { Station } from '../Models/Station';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit, OnDestroy {
  stations: Station[] = [];
  updateBadgeSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private stationService: StationService,
    private router: Router
  ) {}
  user = {
    username: '',
    id: '',
    prenom: '',
  };

  ngOnInit(): void {
    this.authService.userInfo.subscribe((value) => {
      if (value) {
        this.user.id = value.userid;
        this.user.prenom = value.prenom;
        this.user.username = value.username;
      }
    });
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getPendingStations();
    });
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
}
