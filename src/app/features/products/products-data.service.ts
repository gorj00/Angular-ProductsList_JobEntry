import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ProductsService } from 'src/app/services/products.service';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@Injectable()
export class ProductsDataService {
  constructor(
    // private productsService: ProductsService,
    private productsFacade: ProductsFacade
  ) {}

}
