import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Product} from "../../interfaces/table";
import {environment} from "../../../environments/environment";

describe('HomeService', () => {
  let service: HomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    service = TestBed.inject(HomeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("Should be mounted the service", () => {
    expect(service).toBeTruthy();
  });

  it("Should get products", () => {
    service.getProducts().subscribe(response => {
      expect(response).toBeTruthy();
    });
  });

  it('should delete a product', () => {
    const id = '123';
    const authorId = 498590344;

    service.deleteProduct(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/bp/products?id=${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('authorId')).toBe(authorId.toString());
    req.flush({});
  });

  it('should validate an id product', () => {
    const id = '123';
    const authorId = 498590344;

    service.validateIdProduct(id).subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/bp/products/verification?id=${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('authorId')).toBe(authorId.toString());
    req.flush(true);
  });

  it('should create a product', () => {
    const dummyProduct: Product = {
      "date_release": "2024-07-08",
      "name": "prueba prueba 1234",
      "description": "prueba tarjeta no valida eeditada",
      "logo": "logo.svg",
      "id": "0987665",
      "date_revision": "2025-07-08"
    }
    const authorId = 498590344;

    service.createProduct(dummyProduct).subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('authorId')).toBe(authorId.toString());
    req.flush(dummyProduct);
  });

  it('should update a product', () => {
    const dummyProduct: Product = {
      "date_release": "2024-07-03",
      "name": "prueba324654675",
      "description": "prueba tarjeta no valida eeditada",
      "logo": "https://seeklogo.s",
      "id": "123",
      "date_revision": "2025-03-07"
    };
    const authorId = 498590344;

    service.updateProduct(dummyProduct).subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/bp/products`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('authorId')).toBe(authorId.toString());
    req.flush(dummyProduct);
  });
});
