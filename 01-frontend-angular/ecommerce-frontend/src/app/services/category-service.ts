import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getCategoriesList(): Observable<Category[]> {
    return this.httpClient.get<GetCategoriesResponse>(this.baseUrl).pipe(map(response => response._embedded.productCategory));
  }
}

interface GetCategoriesResponse {
  _embedded: {
    productCategory: Category[]
  }
}