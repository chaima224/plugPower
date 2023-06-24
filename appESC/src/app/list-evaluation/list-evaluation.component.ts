import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../shared/services/evaluation.service';
import { Evaluation } from '../Models/Evaluation ';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss'],
})
export class ListEvaluationComponent implements OnInit {
  evaluation: Evaluation[] = [];
  constructor(
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvaluation();
  }
  getEvaluation() {
    this.evaluationService.getEvaluationList().subscribe((data) => {
      this.evaluation = data;
    });
  }

  approuveEvaluation(id: string) {
    this.router.navigate(['/ApprouvedEvaluation', id]);
  }
  deleteEvaluation(id: string) {
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
        this.deleteEvaluation(evaluationId);
      }
    });
  }
}
