import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Borne } from '../Models/Borne';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-approuved-borne',
  templateUrl: './approuved-borne.component.html',
  styleUrls: ['./approuved-borne.component.scss'],
})
export class ApprouvedBorneComponent implements OnInit {
  bornes: Borne[] = [];
  id!: string;
  borne: Borne = new Borne();
  constructor(
    private borneService: BorneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.borneService.getBorneById(this.id).subscribe((data) => {
      this.borne = data;
    });
  }
  onSubmit() {
    this.borneService.approuveBorne(this.id, this.borne).subscribe((data) => {
      this.goToBorneList();
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
        title: ' Plug Updated successfully',
      });
    });
  }

  goToBorneList() {
    this.router.navigate(['/listborne']);
  }

  getBorne() {
    this.borneService.getBorneList().subscribe((data) => {
      this.bornes = data;
    });
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
        this.router.navigate(['/listborne']);
      }
    });
  }
}
