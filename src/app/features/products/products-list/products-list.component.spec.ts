import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { productsListData } from '../resources/test-data';
import { of } from 'rxjs';
import { queryAllByCss, queryByCss, queryByDirective } from 'src/utils/test.utils';
import { DebugElement } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { ProductsFacade } from 'src/app/store/products/products.facade';
import { MockComponent } from 'ng-mocks';
import { Table } from 'primeng/table';
import { EProductQntyChange } from 'src/app/models/products.models';

describe('ProductsListComponent UNIT TEST', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let el: DebugElement;
  let productsDataServiceSpy: any;
  let productsFacadeSpy: any;

  beforeEach(async () => {
    productsDataServiceSpy = jasmine.createSpy('ProductsDataService');
    productsFacadeSpy = jasmine.createSpyObj('ProductsFacade', [
      'removeProductFromList',
      'changeProductQuantityByType',
      'changeProductQuantityByValue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent, MockComponent(Table) ],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: ProductsFacade, useValue: productsFacadeSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    component.data$ = of(productsListData)
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a child (products) table', () => {
    const tableEl = queryByDirective(el, Table);
    const table = tableEl.componentInstance;
    expect(table).toBeTruthy();
  })

  it('should contain 3 products in the table', () => {
    const tableEl = queryByDirective(el, Table);
    const table = tableEl.componentInstance;
    const rows = table.value;
    expect(rows.length).toBe(3)
  })

  describe('table value should react to `selectedProducts` arr changes', () => {
    let tableEl, table, rows;

    it('empty `selectedProducts`', () => {
      component.data$ = of({ ...productsListData, selectedProducts: []})
      fixture.detectChanges();
      tableEl = queryByDirective(el, Table);
      table = tableEl.componentInstance;
      rows = table.value;
      expect(rows.length).toBe(0)
    });

    it('remove one from `selectedProducts`', () => {
      component.data$ = of({
        ...productsListData,
        selectedProducts: productsListData.selectedProducts.slice(
          0,
          productsListData.selectedProducts.length - 1,
        ),
      });
      fixture.detectChanges();
      tableEl = queryByDirective(el, Table);
      table = tableEl.componentInstance;
      rows = table.value;
      expect(rows.length).toBe(2)
    });

    it('add one to `selectedProducts`', () => {
      component.data$ = of({
        ...productsListData,
        selectedProducts: [
          ...productsListData.selectedProducts,
          {...productsListData.selectedProducts[0]},
        ],
      });
      fixture.detectChanges();
      tableEl = queryByDirective(el, Table);
      table = tableEl.componentInstance;
      rows = table.value;
      expect(rows.length).toBe(4)
    });
  })

  describe('products facade communication ...', () => {
    it('... on products item removal', fakeAsync(() => {
      component.removeProductWithDelay(1, 500);
      tick(500)
      expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(1);
    }));

    it('... on quantity change by type', () => {
      component.onQuantityChangedByType(
        {quantity: 5, type: EProductQntyChange.DECREASE},
        1,
      );
      expect(productsFacadeSpy.changeProductQuantityByType).toHaveBeenCalledTimes(1);
      expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(0);
    });

    it('... on quantity change by type with removal', fakeAsync(() => {
      component.onQuantityChangedByType(
        {quantity: 1, type: EProductQntyChange.DECREASE},
        1,
      );
      expect(productsFacadeSpy.changeProductQuantityByType).toHaveBeenCalledTimes(1);
      tick(500);
      expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(1);
    }));

    it('... on quantity change with new val', () => {
      component.onQuantityChangedWithNewVal(5, 1);
      expect(productsFacadeSpy.changeProductQuantityByValue).toHaveBeenCalledTimes(1);
      expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(0);
    });

    it('... on quantity change with new val with removal', fakeAsync(() => {
      component.onQuantityChangedWithNewVal(0, 1);
      expect(productsFacadeSpy.changeProductQuantityByValue).toHaveBeenCalledTimes(1);
      tick(500);
      expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(1);
    }));
  });

  it('should calculate correct total of all products in table', () => {
    expect(
      component.getProductListPrice(productsListData.selectedProducts),
    ).toBe(3596);
  })

});

describe('ProductsListComponent INTEGRATION TEST (child components)', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let el: DebugElement;
  let productsDataServiceSpy: any;
  let productsFacadeSpy: any;

  beforeEach(async () => {
    productsDataServiceSpy = jasmine.createSpy('ProductsDataService');
    productsFacadeSpy = jasmine.createSpyObj('ProductsFacade', [
      'removeProductFromList',
      'changeProductQuantityByType',
      'changeProductQuantityByValue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent, MockComponent(Table) ],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: ProductsFacade, useValue: productsFacadeSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    component.data$ = of(productsListData)
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
