import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';
import { DisponibiliteService } from '../shared/services/Disponibilite.service';
import { DisBorne, DisStation, Disponibilite } from '../Models/Disponibilite';
import { Station } from '../Models/Station';

@Component({
  selector: 'app-bdetails',
  templateUrl: './bdetails.component.html',
  styleUrls: ['./bdetails.component.scss'],
})
export class BdetailsComponent implements OnInit {
  borne: Borne = new Borne();
  station: Station = new Station();
  bornes: Borne[] = [];
  disponibilite: Disponibilite = new Disponibilite();
  idStation!: string;
  idBorne!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private borneService: BorneService,
    private disponibiliteService: DisponibiliteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.disponibilite.borne = new DisBorne();
    this.disponibilite.station = new DisStation();
    this.activatedRoute.params.subscribe((params) => {
      this.idStation = params['idStation'];
      this.idBorne = params['idBorne'];
      this.getBorneDetails();
    });
  }

  getBorneDetails() {
    this.borneService.getBorneById(this.idBorne).subscribe(
      (data) => {
        this.borne = data;
        this.getDisponibilite();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getDisponibilite() {
    this.disponibiliteService
      .getDisponibiliteByStationAndBorne(this.idStation, this.idBorne)
      .subscribe(
        (data) => {
          // Faites quelque chose avec les données retournées
          this.disponibilite = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
