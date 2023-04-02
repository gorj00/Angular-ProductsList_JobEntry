import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EProductQntyChange } from 'src/app/models/products.models';

@Component({
  selector: 'app-quantity-field',
  templateUrl: './quantity-field.component.html',
  styleUrls: ['./quantity-field.component.scss'],
})
export class QuantityFieldComponent {
  @Input() quantity!: number;
  @Output() quantityChangeByTypeAction = new EventEmitter<{
    quantity: number,
    type: EProductQntyChange
  }>();
  @Output() quantityChangeByValueAction = new EventEmitter<number>();

  changeQuantityByType(quantity: number, type: EProductQntyChange) {
    this.quantityChangeByTypeAction.emit({quantity, type})
  }

  increaseQnty(quantity: number) {
    this.changeQuantityByType(quantity, EProductQntyChange.INCREASE)
  }

  decreaseQnty(quantity: number) {
    this.changeQuantityByType(quantity, EProductQntyChange.DECREASE)
  }

  onChangeValue(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    if (value >= 0) {
      this.quantityChangeByValueAction.emit(value);
    } else {
      // Reset input if negative values are attempted
      this.quantityChangeByValueAction.emit(this.quantity);
    }
  }
}
