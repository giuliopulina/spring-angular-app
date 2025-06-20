import { Component } from '@angular/core';
import { Category } from '../common/category';
import { CategoryService } from '../services/category-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-sidebar.html',
  styleUrl: './category-sidebar.css'
})
export class CategorySidebar {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(data => {
      this.categories = data;
    })
  }
}
