import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { Borne } from '../Models/Borne';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../shared/services/evaluation.service';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
})
export class ModalDetailsComponent implements OnInit {
  stations: Station[] = [];
  id!: string;
  station: Station = new Station();
  borne: Borne = new Borne();
  bornes: Borne[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private stationService: StationService,
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
}
