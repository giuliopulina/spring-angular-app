import { Component } from '@angular/core';
import { Product } from '../common/product';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  public product!: Product;

  constructor(private productService: ProductService, public route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });
  }
  getProduct() {
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
    });
    
  }
}
