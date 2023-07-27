import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { StationService } from '../shared/services/station.service';
import { Station } from '../Models/Station';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import Chart from 'chart.js/auto';
import { data } from 'jquery';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit, OnDestroy {
  stations: Station[] = [];
  bornes: Borne[] = [];
  updateBadgeSubscription!: Subscription;
  public chart: any;
  public DonutChart: any;
  public Stationchart: any;
  public ConnectorChart: any;
  constructor(
    private authService: AuthService,
    private stationService: StationService,
    private borneService: BorneService,
    private router: Router
  ) {}
  user = {
    username: '',
    id: '',
    prenom: '',
    nom: '',
  };

  ngOnInit(): void {
    this.authService.userInfo.subscribe((value) => {
      if (value) {
        this.user.id = value.userid;
        this.user.prenom = value.prenom;
        this.user.username = value.username;
      }
    });
    this.updateBadgeSubscription = interval(3000).subscribe(() => {
      this.getPendingStations();
    });
    this.getBorne();
    this.getStation();
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
  createChart(id: any, type: any, data: any) {
    return new Chart(id, {
      type, //this denotes tha type of chart

      data,
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  getBorne() {
    this.borneService.getBorneList().subscribe((data) => {
      this.chart = this.createChart('MyChart', 'pie', {
        labels: ['Approuved', 'Pending'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              data.filter((borne) => borne.status == 'approuved').length,
              data.filter((borne) => borne.status == 'pending').length,
            ],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      });
      this.DonutChart = this.createChart('DonutChart', 'doughnut', {
        labels: ['FAST', 'SLOW'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              data.filter((borne) => borne.mode == 'FAST').length,
              data.filter((borne) => borne.mode == 'SLOW').length,
            ],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      });
      this.ConnectorChart = this.createChart('ConnectorChart', 'bar', {
        labels: ['CEEBLUE', 'Type2MENNEKES', 'COMBOTYPE2', 'Type3A'],
        datasets: [
          {
            label: 'Connectors',
            data: [
              data.filter((borne) => borne.connecteur == 'CEEBLUE').length,
              data.filter((borne) => borne.connecteur == 'Type2MENNEKES')
                .length,
              data.filter((borne) => borne.connecteur == 'COMBOTYPE2').length,
              data.filter((borne) => borne.connecteur == 'Type3A').length,
            ],
            /*  backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],*/
            hoverOffset: 4,
          },
        ],
      });
    });
  }
  getStation() {
    this.stationService.getStationList().subscribe((data) => {
      this.Stationchart = this.createChart('Stationchart', 'pie', {
        labels: ['Approuved', 'Pending'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              data.filter((station) => station.status == 'approuved').length,
              data.filter((station) => station.status == 'pending').length,
            ],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      });
    });
  }
}
