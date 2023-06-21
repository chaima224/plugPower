import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { ActivatedRoute, Router } from '@angular/router';
import { StationService } from '../shared/services/station.service';
import { Borne } from '../Models/Borne';
import { AuthService } from '../shared/services/auth.service';
import Swal from 'sweetalert2';
import { EvaluationService } from '../shared/services/evaluation.service';
import { Evaluation } from '../Models/Evaluation ';
import { User } from '../Models/User';
import { DisStation } from '../Models/Disponibilite';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
})
export class StationDetailsComponent implements OnInit {
  stations: Station[] = [];
  id!: string;
  station: Station = new Station();
  borne: Borne = new Borne();
  bornes: Borne[] = [];
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private stationService: StationService,
    private authService: AuthService,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getStationDetails();
      this.getEvaluationsByStation(this.id);
    });
  }

  getStationDetails() {
    this.stationService.getStationById(this.id).subscribe(
      (data) => {
        this.station = data;
        // Appel de la méthode getEvaluationsByStation avec l'ID de la station
        this.getEvaluationsByStation(this.station.id);
      },
      (error) => {
        console.error(error);
      }
    );
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
  getBorneDetails(id: string) {
    this.router.navigate(['/bornedetails', this.station.id, id]);
  }

  addEvaluation() {
    this.evaluationService
      .saveEvaluation(this.station.id, this.evaluation)
      .subscribe((data) => {
        Swal.fire('Succès!', '', 'success'); // Correction ici
      });
  }

  onSubmit() {
    this.addEvaluation();
  }
  getEvaluationsByStation(stationId: string) {
    this.evaluationService.getEvaluationsByStation(stationId).subscribe(
      (evaluations) => {
        this.evaluations = evaluations;
        // Faites quelque chose avec les évaluations récupérées
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
