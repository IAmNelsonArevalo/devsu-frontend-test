import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/** Components */
import {HomeComponent} from "./screens/home/home.component";
import {CreateProductComponent} from "./screens/create-product/create-product.component";
import {EditProductComponent} from "./screens/edit-product/edit-product.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "create-product", component: CreateProductComponent},
  {path: "edit-product/:id", component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
