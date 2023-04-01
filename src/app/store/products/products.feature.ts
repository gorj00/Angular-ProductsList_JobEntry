import { ProductsActions } from './products.actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { IProductsState, EProductQntyChange } from '../../models/products.models'

const initialState: IProductsState = {
  products: [],
  productsTotal: 0,
  selectedProducts: [],
  selectedProductsTotal: 0,
  loading: false,
  errors: null,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsActions.products_list_request, (state: IProductsState) => ({
      ...state,
      loading: true,
    })),

    on(ProductsActions.products_list_response, (
      state: IProductsState, { items, total }
    ) => ({
      ...state,
      loading: false,
      products: items,
      productsTotal: total,
    })),

    on(ProductsActions.products_list_failure, (
      state: IProductsState, { error }
    ) => ({
      ...state,
      loading: false,
      error,
    })),

    on(ProductsActions.selected_products_add_item, (
      state: IProductsState, { item }
    ) => ({
      ...state,
      selectedProducts: [...state.selectedProducts, {...item, quantity: 1}],
      selectedProductsTotal: state.selectedProductsTotal + 1,
    })),

    on(ProductsActions.selected_products_remove_item, (
      state: IProductsState, { itemId }
    ) => ({
      ...state,
      selectedProducts: state.selectedProducts.filter(product => product.id !== itemId),
      selectedProductsTotal: state.selectedProductsTotal - 1,
    })),

    on(ProductsActions.selected_products_item_qnty_change, (
      state: IProductsState, { itemId, qntyChange }
    ) => {
      const item = state.selectedProducts.find(selProduct => selProduct.id === itemId);
      const selectedProducts = [...state.selectedProducts]
      if (item) {
        let newQnty =
          qntyChange === EProductQntyChange.INCREASE
            ? item.quantity + 1
            : qntyChange === EProductQntyChange.DECREASE
            ? item.quantity - 1
            : item.quantity;

        selectedProducts.push({...item, quantity: newQnty })
      }
      return ({
      ...state,
      selectedProducts,
    })}),

  ),
});

export const {
  name,
  reducer,
  selectProductsState,

  // + AUTO GENERATED SELECTORS
  } = productsFeature
