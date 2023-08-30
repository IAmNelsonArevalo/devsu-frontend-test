import {Component, Input, OnInit} from '@angular/core';
import {Headings, Product} from "../../interfaces/table";
import * as moment from "moment";
import {HomeService} from "../../services/home/home.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() headings: Headings | {} = {};
  @Input() products: Product[] = [];

  protected readonly Object = Object;
  protected readonly moment = moment;
  protected readonly Math = Math;

  countRows: number = 5;
  page: number = 1;
  isDropdownActive: null | number = null;

  constructor(private homeService: HomeService) {
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  changeCountRows(event: Event): void {
    this.countRows = parseInt((event.target as HTMLSelectElement)!.value);
  }

  selectedRows(): Product[] {
    const startIndex = (this.page - 1) * this.countRows;
    const endIndex = startIndex + this.countRows;
    return this.products.slice(startIndex, endIndex);
  }

  handleErrorImage(product: any, event: Event) {
    product.imageLoadFailed = true;
  }

  toggleDropdown(product: Product): void {
    this.products.map((item) => {
      if (item.id !== product.id) {
        item["openDropdown"] = "false";
      }
    });
    if (product["openDropdown"] === "true") {
      product["openDropdown"] = "false";
    } else {
      product["openDropdown"] = "true";
    }
  }

  handleAddPage(): void {
    if ((this.page + 1) <= Math.ceil(this.products.length / this.countRows)) {
      this.page = this.page + 1;
    }
  }

  handleLessPage(): void {
    if ((this.page - 1) >= 1) {
      this.page = this.page - 1;
    }
  }

  handleValidateDelete(product: Product): void {
    this.products.map((item) => {
        item["openDropdown"] = "false";
    });

    let dataNew = null;

    Swal.fire({
      icon: "warning",
      title: "Estas seguro de eliminar el producto?",
      text: "Recuerda que si das click en confirmar el boton sera eliminar.",
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((res) => {
      console.log(res)
      if(res.isConfirmed) {
        this.homeService.deleteProduct(product.id).subscribe((data) => {
          dataNew = data
        });
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  handleGoToEdit(id: string): void {
    window.location.href = `/edit-product/${id}`;
  }
}
