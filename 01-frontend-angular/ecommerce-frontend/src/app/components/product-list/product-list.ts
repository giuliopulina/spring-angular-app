import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapWrapperModule } from '../../ngx-bootstrap-wrapper-module';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, RouterModule, NgxBootstrapWrapperModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css',
  standalone: true
})
export class ProductList {
  
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    //FIXME: weak check for searchMode, but it works
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProductsWithPagination(this.route.snapshot.paramMap.get('keyword')!);
    } else {
      this.handleListProducts();
    }


  }
  handleSearchProducts(keyword: string) {
    this.productService.searchProductsByKeyword(keyword).subscribe(data => {
      this.products = data;
    })
  }

  handleSearchProductsWithPagination(keyword: string) {
    this.productService.searchProductsByKeywordWithPagination(keyword, this.currentPage - 1, this.pageSize).subscribe(data => {
      this.products = data._embedded.product;
      this.totalElements = data.page.totalElements;
    })
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    // check if category changed to avoid Angular recycle old component
    if (this.currentCategoryId != this.previousCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductsListWithPagination(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(data => {
      this.products = data._embedded.product;
      this.totalElements = data.page.totalElements;
    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.listProducts();
  }

  updatePageSize(pageSize : string) {
    this.pageSize = parseInt(pageSize, 10);
    this.currentPage = 1;
    this.listProducts();
  }

}
