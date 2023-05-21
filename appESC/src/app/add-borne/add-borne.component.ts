import { Component, OnInit } from '@angular/core';
import { Connecteur } from '../Models/Connecteur';
import { Mode } from '../Models/Mode';
import { Disponibilite } from '../Models/Disponibilite';
import { Borne } from '../Models/Borne';
import { Router } from '@angular/router';
import { BorneService } from '../shared/services/borne.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-borne',
  templateUrl: './add-borne.component.html',
  styleUrls: ['./add-borne.component.scss'],
})
export class AddBorneComponent implements OnInit {
  borne: Borne = new Borne();

  constructor(private borneService: BorneService, private router: Router) {}

  ngOnInit(): void {}
  addBorne() {
    this.borneService.saveBorne(this.borne).subscribe((data) => {
      this.goToBorneList();
    });
  }
  goToBorneList() {
    this.router.navigate(['/listborne']);
  }
  onSubmit() {
    this.addBorne();
  }
}
