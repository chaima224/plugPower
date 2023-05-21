import { Component, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-listborne',
  templateUrl: './listborne.component.html',
  styleUrls: ['./listborne.component.scss'],
})
export class ListborneComponent implements OnInit {
  bornes: Borne[] = [];
  constructor(private borneService: BorneService, private router: Router) {}

  ngOnInit(): void {
    this.getBorne();
  }
  getBorne() {
    this.borneService.getBorneList().subscribe((data) => {
      this.bornes = data;
    });
  }
  updateBorne(id: string) {
    this.router.navigate(['updateborne', id]);
  }
  deleteBorne(id: string) {
    this.borneService.deleteBorne(id).subscribe((data) => {
      this.getBorne();
    });
  }
}
