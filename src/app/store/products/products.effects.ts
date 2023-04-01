import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ProductsActions } from './products.actions';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { OnInitEffects } from '@ngrx/effects';
import { ProductsService } from 'src/app/services/products.service';

@Injectable()
export class ProductsEffects implements OnInitEffects {
  // MODULE INIT EFFECTS
  // ROOT_EFFECTS_INIT not working for lazily loaded modules, works only forRoot() EffectsModule
  ngrxOnInitEffects(): Action {
    return ProductsActions.products_module_init();
  }

  productsFeatureModuleInitialFetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.products_module_init),
      map(() => ProductsActions.products_list_request(10)),
    ),
  );

  // REGULAR EFFECTS
  fetchProductsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.products_list_request),
      mergeMap(({ limit }) =>
        this.productsService.getProducts(limit).pipe(
          map((productsRes) =>
            ProductsActions.products_list_response(
              productsRes.products,
              productsRes.total,
            ),
          ),
          catchError((error) =>
            of(ProductsActions.products_list_failure(error)),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
  ) {}
}
