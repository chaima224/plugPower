import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';
// import 'rs-Layer';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  handleSearchClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/searchStation';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access denied.',
        text: 'You must be logged in to access this page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
  handleListClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/UtilisateurBorne';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access denied.',
        text: 'You must be logged in to access this page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
}
