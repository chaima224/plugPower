import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Borne } from '../Models/Borne';
import { ActivatedRoute, Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';

@Component({
  selector: 'app-update-borne',
  templateUrl: './update-borne.component.html',
  styleUrls: ['./update-borne.component.scss'],
})
export class UpdateBorneComponent implements OnInit {
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
    this.borneService.updateBorne(this.id, this.borne).subscribe((data) => {
      this.goToBorneList();
    });
  }
  goToBorneList() {
    this.router.navigate(['/listborne']);
  }
}
