import { Component } from '@angular/core';
import { CategorySidebar } from './category-sidebar/category-sidebar';
import { RouterOutlet } from '@angular/router';
import { Search } from './search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategorySidebar, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ecommerce-frontend';
}
