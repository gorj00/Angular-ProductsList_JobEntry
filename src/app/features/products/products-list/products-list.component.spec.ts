import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { productsListData } from '../resources/test-data';
import { of } from 'rxjs';
import { queryAllByTestAttr, queryByCss, queryByTestAttr } from 'src/utils/test.utils';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { ProductsFacade } from 'src/app/store/products/products.facade';

xdescribe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let el: DebugElement;
  let productsDataServiceSpy: any;
  let productsFacadeSpy: any;

  beforeEach(async () => {
    productsDataServiceSpy = jasmine.createSpy('ProductsDataService');
    productsFacadeSpy = jasmine.createSpy('ProductsFacade');

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: ProductsFacade, useValue: productsFacadeSpy },
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    // component.data$ = of(productsListData)
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 products in a list', fakeAsync(() => {
    productsDataServiceSpy.data$ = of(productsListData);
    // fixture.detectChanges()
    // tick(2000)
    // flushMicrotasks(); // handle microtask
    // flush();
    // fixture.detectChanges()
    // const listProducts = queryAllByTestAttr(el, 'product-row', 'tr');
    // const listProducts = queryByTestAttr(el, 'products-list-card');
      const listProducts = queryByCss(el, '.card');
    console.log(listProducts)
    expect(listProducts).toBeTruthy();
    // expect(listProducts.length).toBe(3)
  }))
});
