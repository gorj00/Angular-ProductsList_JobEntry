import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HttpService } from '../../services/http.service'
import { StoreModule } from '@ngrx/store'
import { ProductsFeatureRoutingModule } from './products-routing.module'
import { ProductsDataService } from './products-data.service';
import { ProductsEffects } from 'src/app/store/products/products.effects';
import { productsFeature } from 'src/app/store/products/products.feature';
import { SharedModule } from 'src/app/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsService } from 'src/app/services/products.service';
import { QuantityFieldComponent } from './products-list/quantity-field/quantity-field.component';

@NgModule({
  declarations: [
    // BlogPostsComponent,

    ProductsListComponent,
    QuantityFieldComponent
  ],
  imports: [
    CommonModule,
    ProductsFeatureRoutingModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature([ProductsEffects]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    HttpService,
    ProductsService,
    ProductsDataService,
    { provide: 'apiUrl', useValue: 'https://dummyjson.com' },
    // BlogPostDataService,
  ],
  bootstrap: []
})
export class ProductsFeatureModule {
  constructor() {

  }
 }
