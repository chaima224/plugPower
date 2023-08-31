import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../Models/Evaluation ';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../shared/services/evaluation.service';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-approuved-evaluation',
  templateUrl: './approuved-evaluation.component.html',
  styleUrls: ['./approuved-evaluation.component.scss'],
})
export class ApprouvedEvaluationComponent implements OnInit {
  id!: string;
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[] = [];
  constructor(
    private evaluationService: EvaluationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.evaluationService.getEvauationById(this.id).subscribe((data) => {
      this.evaluation = data;
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
  getEvaluation() {
    this.evaluationService.getEvaluationList().subscribe((data) => {
      this.evaluations = data;
    });
  }

  onSubmit() {
    this.evaluationService
      .approuveEvaluation(this.id, this.evaluation)
      .subscribe((data) => {
        this.goToEvaluationList();
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
          title: ' Comment Approuved ',
        });
      });
  }
  goToEvaluationList() {
    this.router.navigate(['/listEvaluation']);
  }
  deleteStation(id: string) {
    this.evaluationService.deleteEvaluation(id).subscribe((data) => {
      this.getEvaluation();
    });
  }

  confirmDelete(evaluationId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this station!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStation(evaluationId);
        this.router.navigate(['/listEvaluation']);
      }
    });
  }
}
