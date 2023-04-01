export interface IProduct {
    id:                 number;
    title:              string;
    description:        string;
    price:              number;
    discountPercentage: number;
    rating:             number;
    stock:              number;
    brand:              string;
    category:           string;
    thumbnail:          string;
    images:             string[];
}

export interface ISelectedProduct extends IProduct {
    quantity: number;
}

export interface IProductsResponse {
    products: IProduct[];
    total:    number;
    skip:     number;
    limit:    number;
}

export interface IProductsState {
  products: IProduct[];
  productsTotal: number;
  selectedProducts: ISelectedProduct[];
  selectedProductsTotal: number;
  loading:   boolean;
  errors:    any;
};

export enum EProductQntyChange { INCREASE, DECREASE }
