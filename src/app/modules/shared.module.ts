import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  exports: [PrimeNgModule],
})
export class SharedModule { }
