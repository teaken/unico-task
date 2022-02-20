import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TableModule } from '../shared/table/table.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TableModule

  ]
})
export class HomeModule { }
