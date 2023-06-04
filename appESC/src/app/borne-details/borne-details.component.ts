import { Component, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { ActivatedRoute, Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-borne-details',
  templateUrl: './borne-details.component.html',
  styleUrls: ['./borne-details.component.scss'],
})
export class BorneDetailsComponent implements OnInit {
  borne: Borne = new Borne();
  id!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private borneService: BorneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getBorneDetails();
    });
  }

  getBorneDetails() {
    this.borneService.getBorneById(this.id).subscribe(
      (data) => {
        this.borne = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
