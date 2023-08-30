import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../../interfaces/table";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      "authorId": 123456789
    });

    return this.http.get<Product[]>(`${this.baseUrl}/bp/products`, {headers});
  }

  deleteProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      "authorId": 498590344
    });

    return this.http.delete(`${this.baseUrl}/bp/products?id=${id}`, {headers});
  }

  validateIdProduct(id: string): Observable<boolean> {
    const headers = new HttpHeaders({
      "authorId": 498590344
    });

    return this.http.get<boolean>(`${this.baseUrl}/bp/products/verification?id=${id}`, {headers});
  }

  createProduct(data: any): Observable<Product> {
    const headers = new HttpHeaders({
      "authorId": 498590344
    });

    return this.http.post<Product>(`${this.baseUrl}/bp/products`,data, {headers});
  }

  updateProduct(data: any): Observable<Product> {
    const headers = new HttpHeaders({
      "authorId": 498590344
    });

    return this.http.put<Product>(`${this.baseUrl}/bp/products`,data, {headers});
  }
}
