import { IProductsResponse } from 'src/app/models/products.models';
import { HttpService } from './http.service'; // service injected imported
import { Injectable } from '@angular/core'; // Injectable() imported
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private http: HttpService) {}

  private appendUrl = '/products';

  getProducts(limit: number = 10): Observable<IProductsResponse> {
    return this.http.Get(this.appendUrl, {
      params: new HttpParams().append('limit', limit),
    });
  }
}
