import { Component, OnDestroy, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';
import { Router } from '@angular/router';
import { data } from 'jquery';
import Swal from 'sweetalert2';
import { Station } from '../Models/Station';
import { Subscription, interval } from 'rxjs';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-listborne',
  templateUrl: './listborne.component.html',
  styleUrls: ['./listborne.component.scss'],
})
export class ListborneComponent implements OnInit, OnDestroy {
  bornes: Borne[] = [];
  stations: Station[] = [];
  updateBadgeSubscription!: Subscription;
  constructor(
    private borneService: BorneService,
    private stationService: StationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorne();
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getPendingStations();
    });
  }
  getBorne() {
    this.borneService.getBorneList().subscribe((data) => {
      this.bornes = data;
    });
  }
  updateBorne(id: string) {
    this.router.navigate(['updateborne', id]);
  }
  approuveBorne(id: string) {
    this.router.navigate(['ApprouvedBorne', id]);
  }
  deleteBorne(id: string) {
    this.borneService.deleteBorne(id).subscribe((data) => {
      this.getBorne();
    });
  }
  confirmDelete(BorneId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this plug!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBorne(BorneId);
      }
    });
  }
  getStatusColor(status: string): string {
    // Define the color based on the status value
    if (status === 'pending') {
      return 'orange';
    } else if (status === 'approuved') {
      return 'green';
    } else {
      // Return default color (black, for example)
      return 'black';
    }
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
