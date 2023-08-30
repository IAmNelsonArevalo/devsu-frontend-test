import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {Headings, Product} from "../../interfaces/table";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  headings: Headings | {} = {logo: "Logo", name: "Nombre del producto", description: "Descripcion", date_release: "Fecha de liberacion", date_revision: "Fecha de reestructuracion"};

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getProducts().subscribe((data: Product[]) => {
      this.products = data
    });
  }

  filterProducts(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toLowerCase();

    this.homeService.getProducts().subscribe((data: Product[]) => {
      this.products = data.filter((item: Product) => item.name.toLowerCase().includes(value));
    });
  }

  handleGoToCreate(): void {
    window.location.href = "/create-product";
  }
}
