import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HomeService} from "../../services/home/home.service";
import * as moment from "moment/moment";
import {IError} from "../create-product/create-product.component";
import {Product} from "../../interfaces/table";
import {ActivatedRoute} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  error: IError = {};
  formCreate: FormGroup;
  products: Product[] = [];
  product: Product | undefined = undefined;

  constructor(private homeService: HomeService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.handleChangeDate.bind(this);

    this.formCreate = this.fb.group({
      id: [{value: "", disabled: true}, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      date_release: [undefined, [Validators.required, this.fechaMayorActualValidator()]], // Corregido aquí
      date_revision: [{ value: undefined, disabled: true }, Validators.required],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], // Corregido aquí
      description: [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]], // Corregido aquí
      logo: [undefined, Validators.required]
    });

    this.getProduct = this.getProduct.bind(this);
  }

  ngOnInit(): void {
    let id: string = "";

    this.route.paramMap.subscribe((params: any) => {
      id = params.get("id");
    })

    this.getProducts();
    this.getProduct(id);
  }

  getProducts(): void {
    this.homeService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getProduct(id: string): void {
    this.homeService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.product = data.find((item: Product) => item.id === id)

      this.formCreate.controls['id'].setValue(this.product?.id);
      this.formCreate.controls['name'].setValue(this.product?.name);
      this.formCreate.controls['description'].setValue(this.product?.description);
      this.formCreate.controls['logo'].setValue(this.product?.logo);
      this.formCreate.controls['date_release'].setValue(moment(this.product?.date_release).format('YYYY-MM-DD'));
      this.formCreate.controls['date_revision'].setValue(moment(this.product?.date_revision).format('DD/MM/YYYY'));
      this.formCreate.value['date_revision'] = moment(this.product?.date_revision).format('YYYY-MM-DD');
      this.formCreate.value['id'] = this.product?.id;
      this.formCreate.value['date_revision'] = moment(this.product?.date_revision).format('YYYY-MM-DD');
    });
  }

  fechaMayorActualValidator() {
    return (control: AbstractControl): ValidationErrors | null => {

      const fechaIngresada = moment(control.value).format('YYYY-MM-DD'); // Parsea la fecha usando Moment.js

      const fechaActual = moment().format('YYYY-MM-DD');
      console.log("data", fechaIngresada < fechaActual)
      if (fechaIngresada < fechaActual) {
        return { fechaMenorActual: true };
      }

      return null;
    };
  }

  handleChangeDate(): void {
    const date: string = this.formCreate.get("date_release")?.value;
    const selectedDateObj = new Date(date);
    selectedDateObj.setFullYear(selectedDateObj.getFullYear() + 1);
    console.log(selectedDateObj.toISOString().split('T'));
    this.formCreate.controls["date_revision"].setValue(moment(selectedDateObj.toISOString().split('T')[0]).format("DD/MM/YYYY"))
    this.formCreate.value["date_revision"] = selectedDateObj.toISOString().split('T')[0];
  }

  handleValidateForm(): void {
    const id = this.formCreate.get("id")?.value;
    const data = {...this.formCreate.value, id: this.formCreate.get("id")?.value, date_revision: moment(this.formCreate.get("date_revision")?.value).format("YYYY-MM-DD")}

    console.log(this.formCreate);
    if (this.formCreate.valid) {
      if (id && id === "") {
        this.error["ID"] = "ID no valido!";
      } else {
        this.homeService.updateProduct(data).pipe(
          catchError((error) => {
            console.error('Ocurrió un error:', error);
            alert(`Ocurrio un problema al momento de actualizar el usuario: ${error.error}`)
            return throwError(error.error);
          })
        ).subscribe((data) => {
          window.location.href = "/"
        })
      }
    }
  }

  validateForm(): boolean {
    return this.formCreate.status === "VALID";
  }

  resetForm(): void {
    this.formCreate.reset();
  }

  get idError(): string {
    if(this.formCreate.controls['id'].errors?.['required']) {
      return 'required';
    } else if (this.formCreate.controls['id'].errors?.['minlength']) {
      return 'minlength';
    } else if(this.formCreate.controls['id'].errors?.['maxlength']) {
      return 'maxlength';
    } else {
      return '';
    }
  }

  get dateError(): string {
    if(this.formCreate.controls['date_release'].errors?.['required']) {
      return 'required';
    } else if (this.formCreate.controls['date_release'].errors?.['fechaInvalida']) {
      return 'fechaInvalida';
    } else if(this.formCreate.controls['date_release'].errors?.['fechaMenorActual']) {
      return 'fechaMenorActual';
    } else {
      return '';
    }
  }

  get logoError(): string {
    if(this.formCreate.controls['logo'].errors?.['required']) {
      return 'required';
    } else {
      return '';
    }
  }

  get descriptionError(): string {
    if(this.formCreate.controls['description'].errors?.['required']) {
      return 'required';
    } else if (this.formCreate.controls['description'].errors?.['minlength']) {
      return 'minlength';
    } else if(this.formCreate.controls['description'].errors?.['maxlength']) {
      return 'maxlength';
    } else {
      return '';
    }
  }

  get nameError(): string {
    if(this.formCreate.controls['name'].errors?.['required']) {
      return 'required';
    } else if (this.formCreate.controls['name'].errors?.['minlength']) {
      return 'minlength';
    } else if(this.formCreate.controls['name'].errors?.['maxlength']) {
      return 'maxlength';
    } else {
      return '';
    }
  }
}
