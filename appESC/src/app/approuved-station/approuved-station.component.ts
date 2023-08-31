import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-approuved-station',
  templateUrl: './approuved-station.component.html',
  styleUrls: ['./approuved-station.component.scss'],
})
export class ApprouvedStationComponent implements OnInit {
  id!: string;
  station: Station = new Station();
  stations: Station[] = [];

  constructor(
    private stationService: StationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.stationService.getStationById(this.id).subscribe((data) => {
      this.station = data;
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
  getStation() {
    this.stationService.getStationList().subscribe((data) => {
      this.stations = data;
    });
  }
  onSubmit() {
    this.stationService
      .approuveStation(this.id, this.station)
      .subscribe((data) => {
        this.goToStationList();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: ' Station Approuved ',
        });
      });
  }
  goToStationList() {
    this.router.navigate(['/liststation']);
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
        this.router.navigate(['/liststation']);
      }
    });
  }
}
