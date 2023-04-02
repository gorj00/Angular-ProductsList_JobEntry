import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap, take } from 'rxjs/operators'
import { ProductsActions } from './products.actions';
import { combineLatest, from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { OnInitEffects } from '@ngrx/effects';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsFacade } from './products.facade';
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

  setupThreeInitialSelectedProductsEffect$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(ProductsActions.products_module_init)),
      this.actions$.pipe(ofType(ProductsActions.products_list_response)),
      this.productsFacade.products$,
    ]).pipe(
      switchMap(([initAction, resAction, products]) =>
        from(products.map(
          (product) => ProductsActions.selected_products_add_item(product),
        )),
      ),
      take(5),
    ),
  );

  // REGULAR EFFECTS
  fetchProductsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.products_list_request),
      mergeMap(({limit}) =>
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
    private productsFacade: ProductsFacade,
  ) {}
}
