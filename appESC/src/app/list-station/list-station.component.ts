import { Component, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { data } from 'jquery';
import { Station } from '../Models/Station';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-list-station',
  templateUrl: './list-station.component.html',
  styleUrls: ['./list-station.component.scss'],
})
export class ListStationComponent implements OnInit {
  station: Station[] = [];
  pagedStation: Station[] = [];
  autoHidePagination: boolean = true;
  itemsPerPage: number = 6;
  page: number = 1;

  constructor(
    private stationService: StationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.stationService.getStationList().subscribe((data) => {
      this.station = data;
      this.updatePagedStation();
    });
  }

  updateStation(id: string) {
    this.router.navigate(['/updatestation', id]);
  }
  approuveStation(id: string) {
    this.router.navigate(['/ApprouvedStation', id]);
  }
  deleteStation(id: string) {
    this.stationService.deleteStation(id).subscribe((data) => {
      this.getStation();
    });
  }
  confirmDelete(stationId: string): void {
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
        this.deleteStation(stationId);
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
    this.pagedStation = this.station.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.station.length / this.itemsPerPage);
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
