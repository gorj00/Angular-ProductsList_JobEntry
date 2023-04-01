import { IProduct, EProductQntyChange } from 'src/app/models/products.models';
import { createActionGroup, emptyProps } from '@ngrx/store';

enum actionTypes {
  PRODUCTS_MODULE_INIT = 'PRODUCTS_MODULE_INIT',

  PRODUCTS_LIST_REQUEST = 'PRODUCTS_LIST_REQUEST',
  PRODUCTS_LIST_RESPONSE = 'PRODUCTS_LIST_RESPONSE',
  PRODUCTS_LIST_FAILURE = 'PRODUCTS_LIST_FAILURE',

  SELECTED_PRODUCTS_ADD_ITEM = 'SELECTED_PRODUCTS_ADD_ITEM',
  SELECTED_PRODUCTS_REMOVE_ITEM = 'SELECTED_PRODUCTS_REMOVE_ITEM',
  SELECTED_PRODUCTS_ITEM_QNTY_CHANGE = 'SELECTED_PRODUCTS_ITEM_QNTY_CHANGE',
}

export const ProductsActions = createActionGroup({
  source: '[PRODUCTS]',
  events: {
    [actionTypes.PRODUCTS_MODULE_INIT]: emptyProps(),

    [actionTypes.PRODUCTS_LIST_REQUEST]: (limit: number) => ({limit}),
    [actionTypes.PRODUCTS_LIST_RESPONSE]: (
      items: IProduct[],
      total: number,
    ) => ({items, total}),
    [actionTypes.PRODUCTS_LIST_FAILURE]: (error: any) => ({error}),

    [actionTypes.SELECTED_PRODUCTS_ADD_ITEM]: (item: IProduct) => ({item}),
    [actionTypes.SELECTED_PRODUCTS_REMOVE_ITEM]: (itemId: number) => ({itemId}),
    [actionTypes.SELECTED_PRODUCTS_ITEM_QNTY_CHANGE]: (
      itemId: number,
      qntyChange: EProductQntyChange,
    ) => ({
      itemId, qntyChange
    }),
  },
});
