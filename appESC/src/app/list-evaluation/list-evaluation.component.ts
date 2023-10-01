import { Component, OnDestroy, OnInit } from '@angular/core';
import { EvaluationService } from '../shared/services/evaluation.service';
import { Evaluation } from '../Models/Evaluation ';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss'],
})
export class ListEvaluationComponent implements OnInit, OnDestroy {
  stations: Station[] = [];
  updateBadgeSubscription!: Subscription;
  evaluation: Evaluation[] = [];
  pagedEvaluation: Evaluation[] = [];
  autoHidePagination: boolean = true;
  itemsPerPage: number = 6;
  page: number = 1;
  constructor(
    private evaluationService: EvaluationService,
    private stationService: StationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvaluation();
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getPendingStations();
    });
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
  getEvaluation() {
    this.evaluationService.getEvaluationList().subscribe((data) => {
      this.evaluation = data;
      this.updatePagedEvaluation();
    });
  }

  approuveEvaluation(id: string) {
    this.router.navigate(['/ApprouvedEvaluation', id]);
  }
  deleteEvaluation(id: string) {
    this.evaluationService.deleteEvaluation(id).subscribe((data) => {
      this.getEvaluation();
    });
  }
  confirmDelete(evaluationId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this station!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEvaluation(evaluationId);
      }
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
  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagedEvaluation();
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagedEvaluation();
    }
  }

  updatePagedEvaluation() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedEvaluation = this.evaluation.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.evaluation.length / this.itemsPerPage);
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
