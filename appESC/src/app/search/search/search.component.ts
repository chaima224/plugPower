import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  divClass: string = 'custom-class';
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
 
}
