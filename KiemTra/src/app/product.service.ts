import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from './model/Employee';
import { Product } from './model/Product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; //api dbjson
  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  // GET a single product by ID
  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.get<any>(url);
  }

  // CREATE a new product
  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Product>(this.apiUrl, product, {
      headers: headers,
    });
  }

  // UPDATE an existing product
  updateProduct(productId: number, product: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.put<any>(url, product);
  }

  loginAccount(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login/${email}/${password}`;
    return this.httpClient.get<any>(url);
  }

  // DELETE a product
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.delete<any>(url);
  }

  public getAllBrands(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/products/brands'
    );
  }

  public getAllStatuses(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/products/statuses'
    );
  }

  public getAllSubCategories(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/products/subcategories'
    );
  }
  public getAllProductBySubCategories(id: number): Observable<any> {
    var uri = 'http://localhost:8080/api/products/subcategories/' + id;
    return this.httpClient.get<any>(uri);
  }
  public getAllProductByBrands(id: number): Observable<any> {
    var uri = 'http://localhost:8080/api/products/brands/' + id;
    return this.httpClient.get<any>(uri);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {
    }
    console.error(
      'Backend returned code ${error.status},' + `body was: ${error.error}`
    );
    return throwError('Something bad happened; please try again later. ');
  }
}
