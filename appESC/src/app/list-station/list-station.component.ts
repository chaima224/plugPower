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
}
