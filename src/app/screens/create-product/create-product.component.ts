import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import * as moment from "moment";
import {Product} from "../../interfaces/table";
import {ActivatedRoute} from "@angular/router";

export interface IError {
  ID?: string;
}



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  error: IError = {};
  formCreate: FormGroup;

  constructor(private homeService: HomeService, private fb: FormBuilder) {
    this.handleChangeDate.bind(this);

    this.formCreate = this.fb.group({
      id: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      date_release: ["", [Validators.required, this.fechaMayorActualValidator()]], // Corregido aquí
      date_revision: [{ value: "", disabled: true }, Validators.required],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], // Corregido aquí
      description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]], // Corregido aquí
      logo: ["", Validators.required]
    });


  }

  ngOnInit(): void {

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

    console.log(this.formCreate);
    if (this.formCreate.valid) {
      if (id && id === "") {
        this.error["ID"] = "ID no valido!";
      } else {
        this.homeService.validateIdProduct(id).subscribe((data) => {
          if (data) {
            this.error["ID"] = "ID no valido!"
          } else {
            this.homeService.createProduct(this.formCreate.value).subscribe((data) => {
              window.location.href = "/"
            })
          }
        });
      }
    }
  }

  validateForm(): boolean {
    console.log(this.formCreate)
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

