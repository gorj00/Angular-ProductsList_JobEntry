import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';
// import { Observable } from 'rxjs';
// import { ProductsService } from 'src/app/services/products.service';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@Injectable()
export class ProductsDataService {
  constructor(
    // private productsService: ProductsService,
    private productsFacade: ProductsFacade
  ) {}

  data$ = combineLatest(
    this.productsFacade.products$,
    this.productsFacade.selectedProducts$
  ).pipe(
    map(([products, selectedProducts]) => ({ products, selectedProducts })),
    shareReplay({ refCount: true, bufferSize: 1 })
  )

}
