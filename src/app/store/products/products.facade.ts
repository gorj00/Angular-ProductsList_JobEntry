import { ProductsActions } from './products.actions';
import { IProductsState } from '../../models/products.models';
import { productsFeature } from './products.feature';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {

  // SELECTORS 
  products$ = this.store.select(productsFeature.selectProducts)
  productsTotal$ = this.store.select(productsFeature.selectProductsTotal)
  selectedProducts$ = this.store.select(productsFeature.selectSelectedProducts)
  selectedProductsTotal$ = this.store.select(productsFeature.selectSelectedProductsTotal)
  productsLoading$ = this.store.select(productsFeature.selectLoading)
  productsError$ = this.store.select(productsFeature.selectErrors)

  constructor(private store: Store<IProductsState>) {}

  // CONTAINER DISPATCHERS
  fetchProductsList(limit: number = 10) {
    this.store.dispatch(ProductsActions.products_list_request(limit))
  }

}
