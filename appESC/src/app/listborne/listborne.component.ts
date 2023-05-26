import { Component, OnInit } from '@angular/core';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';
import { Router } from '@angular/router';
import { data } from 'jquery';
import Swal from 'sweetalert2';

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
  confirmDelete(BorneId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this plug!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBorne(BorneId);
      }
    });
  }
}
