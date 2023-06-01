import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-station',
  templateUrl: './update-station.component.html',
  styleUrls: ['./update-station.component.scss'],
})
export class UpdateStationComponent implements OnInit {
  id!: string;
  station: Station = new Station();

  constructor(
    private stationService: StationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.stationService.getStationById(this.id).subscribe((data) => {
      this.station = data;
    });
  }
  onSubmit() {
    this.stationService
      .updateStation(this.id, this.station)
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
          title: ' Station Updated successfully',
        });
      });
  }
  goToStationList() {
    this.router.navigate(['/liststation']);
  }
}
