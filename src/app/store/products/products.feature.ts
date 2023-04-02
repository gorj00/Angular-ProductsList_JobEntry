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

    on(ProductsActions.selected_products_item_qnty_change_by_type, (
      state: IProductsState, { itemId, qntyChangeType }
    ) => {
      const item = state.selectedProducts.find(selProduct => selProduct.id === itemId);
      let selectedProducts = [...state.selectedProducts]
      if (item) {
        const newQnty =
          qntyChangeType === EProductQntyChange.INCREASE
            ? item.quantity + 1
            : qntyChangeType === EProductQntyChange.DECREASE
            ? item.quantity - 1
            : item.quantity;

        selectedProducts = selectedProducts.map((el) =>
          el.id === itemId ? {...el, quantity: newQnty} : el,
        );
      }
      return ({
      ...state,
      selectedProducts,
    })}),

    on(ProductsActions.selected_products_item_qnty_change_by_value, (
      state: IProductsState, { itemId, newVal }
    ) => {
      const item = state.selectedProducts.find(selProduct => selProduct.id === itemId);
      let selectedProducts = [...state.selectedProducts]
      if (item) {
        selectedProducts = selectedProducts.map((el) =>
          el.id === itemId ? {...el, quantity: newVal} : el,
        );
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
