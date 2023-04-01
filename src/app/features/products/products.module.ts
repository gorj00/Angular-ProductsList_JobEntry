import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HttpService } from '../../services/http.service'
import { StoreModule } from '@ngrx/store'
import { ProductsFeatureRoutingModule } from './products-routing.module'

import { ProductsEffects } from 'src/app/store/products/products.effects';
import { productsFeature } from 'src/app/store/products/products.feature';
// import { BlogDataService } from './blog-dara.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsService } from 'src/app/services/products.service';

@NgModule({
  declarations: [
    // BlogPostsComponent,

    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsFeatureRoutingModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature([ProductsEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    ProductsService,
    { provide: 'apiUrl', useValue: 'https://dummyjson.com' },
    // BlogPostDataService,
  ],
  bootstrap: []
})
export class ProductsFeatureModule {
  constructor() {

  }
 }
