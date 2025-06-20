import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {

  constructor(private router : Router) {}

  doSearch(value: string) {
    console.log("searched = ", value);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
