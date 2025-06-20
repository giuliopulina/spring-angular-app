import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl: string = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductById(productId: number): Observable<Product> {
    return this.remoteGetProductById(`${this.baseUrl}/${productId}`);
  }

  searchProductsByKeyword(keyword: string): Observable<Product[]> {
    return this.remoteGetProducts(`${this.baseUrl}/search/findByNameContaining?name=${keyword}`);
  }

  searchProductsByKeywordWithPagination(keyword: string, page: number, pageSize: number) : Observable<GetProductsResponse>{
     const remoteUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
     return this.httpClient.get<GetProductsResponse>(remoteUrl);
  }

  getProductsList(currentCategoryId: number): Observable<Product[]> {
    return this.remoteGetProducts(`${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`);
  }

  getProductsListWithPagination(currentCategoryId: number, page: number, pageSize: number): Observable<GetProductsResponse> {
    const remoteUrl = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetProductsResponse>(remoteUrl);
  }

  private remoteGetProductById(url: string): Observable<Product> {
    return this.httpClient.get<Product>(url);
  }

  private remoteGetProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GetProductsResponse>(url).pipe(map(response => response._embedded.product));
  }
}

interface Page {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
}

interface GetProductsResponse {
  _embedded: {
    product: Product[]
  },
  page: Page
}
