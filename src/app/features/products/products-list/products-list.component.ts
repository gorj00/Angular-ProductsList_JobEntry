import { Component } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { EProductQntyChange, ISelectedProduct } from 'src/app/models/products.models';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  constructor(
    private productsDataService: ProductsDataService,
    private productsFacade: ProductsFacade,
  ) {}

  data$ = this.productsDataService.data$;

  removeProductWithDelay(itemId: number, delay: number = 500) {
    setTimeout(() => {
      this.productsFacade.removeProductFromList(itemId);
    }, delay);
  }

  onQuantityChangedByType(
    event: {quantity: number; type: EProductQntyChange},
    itemId: number,
  ) {
    const {quantity, type} = event;
    this.productsFacade.changeProductQuantityByType(itemId, type);

    if (quantity === 1 && type === EProductQntyChange.DECREASE) {
      this.removeProductWithDelay(itemId);
    }
  }

  onQuantityChangedWithNewVal(
    quantity: number,
    itemId: number,
  ) {
    this.productsFacade.changeProductQuantityByValue(itemId, quantity);

    if (quantity === 0) {
      this.removeProductWithDelay(itemId);
    }
  }

  getProductListPrice(list: ISelectedProduct[]) {
    return list.reduce((partialSum, a) => partialSum + (a.price * a.quantity), 0)

  }
}
