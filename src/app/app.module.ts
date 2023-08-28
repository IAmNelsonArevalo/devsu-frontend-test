import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/compiler";
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
