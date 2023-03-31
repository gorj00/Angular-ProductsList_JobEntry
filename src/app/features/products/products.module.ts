import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HttpService } from '../../services/http.service'
import { StoreModule } from '@ngrx/store'
import { ProductsFeatureRoutingModule } from './products-routing.module'

// import { ProductsEffects } from 'src/app/ngrx/store/blog/blog.effects';
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
    // StoreModule.forFeature(blogFeature),
    // EffectsModule.forFeature([BlogEffects]),
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
