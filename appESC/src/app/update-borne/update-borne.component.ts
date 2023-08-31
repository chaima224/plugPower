import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Borne } from '../Models/Borne';
import { ActivatedRoute, Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-update-borne',
  templateUrl: './update-borne.component.html',
  styleUrls: ['./update-borne.component.scss'],
})
export class UpdateBorneComponent implements OnInit {
  bornes: Borne[] = [];
  id!: string;
  borne: Borne = new Borne();
  constructor(
    private borneService: BorneService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.borneService.getBorneById(this.id).subscribe((data) => {
      this.borne = data;
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
  onSubmit() {
    this.borneService.updateBorne(this.id, this.borne).subscribe((data) => {
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
