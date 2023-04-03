import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { productsListData } from '../resources/test-data';
import { of } from 'rxjs';
import { queryAllByTestAttr, queryByDirective, queryByTestAttr } from 'src/utils/test.utils';
import { DebugElement } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { ProductsFacade } from 'src/app/store/products/products.facade';
import { MockComponent } from 'ng-mocks';
import { Table } from 'primeng/table';
import { EProductQntyChange } from 'src/app/models/products.models';
import { PrimeNgModule } from 'src/app/modules/primeng.module';
import { QuantityFieldComponent } from './quantity-field/quantity-field.component';

describe('ProductsListComponent UNIT TEST - SHALLOW RENDER', () => {
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

describe('ProductsListComponent UNIT TEST - DEEP RENDER (with child components)', () => {
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
      declarations: [ ProductsListComponent, QuantityFieldComponent ],
      imports: [PrimeNgModule],
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

  it('should have a products table', () => {
    const table = queryByTestAttr(el, 'products-table');
    expect(table).toBeTruthy();
  })

  it('should display 3 products in the table', () => {
    const rows = queryAllByTestAttr(el, 'products-table-row');
    expect(rows.length).toBe(3)
  })

  describe('table rows length should react to adding or removing products', () => {
    let table, rows;

    it('should display `No products` message on empty table', () => {
      component.data$ = of({ ...productsListData, selectedProducts: []})
      fixture.detectChanges();
      table = queryByTestAttr(el, 'products-table');
      rows = queryAllByTestAttr(el, 'products-table-row');
      const emptyMessage = queryByTestAttr(el, 'no-products-message');
      const messageText = emptyMessage.nativeElement.innerText;
      expect(emptyMessage).toBeTruthy();
      expect(messageText).toBe('No products');
      expect(rows.length).toBe(0);
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
      rows = queryAllByTestAttr(el, 'products-table-row');
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
      rows = queryAllByTestAttr(el, 'products-table-row');
      expect(rows.length).toBe(4)
    });
  })

  describe('quantity field', () => {
    it('should sent product increase request on a increase button click', () => {
      const rows = queryAllByTestAttr(el, 'products-table-row');
      const firstProduct = rows[0]
      const increaseBtn = queryByTestAttr(firstProduct, 'qnty-increase-btn');
      spyOn(component, 'onQuantityChangedByType');
      expect(increaseBtn).toBeTruthy();
      increaseBtn.triggerEventHandler('click');
      expect(component.onQuantityChangedByType).toHaveBeenCalledWith({
        quantity: 1,
        type: EProductQntyChange.INCREASE,
      }, 1);
    });

    it('should sent product decrease request on a decrease button click', () => {
      const rows = queryAllByTestAttr(el, 'products-table-row');
      const firstProduct = rows[0]
      const decreaseBtn = queryByTestAttr(firstProduct, 'qnty-decrease-btn');
      spyOn(component, 'onQuantityChangedByType');
      expect(decreaseBtn).toBeTruthy();
      decreaseBtn.triggerEventHandler('click');
      expect(component.onQuantityChangedByType).toHaveBeenCalledWith({
        quantity: 1,
        type: EProductQntyChange.DECREASE,
      }, 1);
    });

    it('should sent product qnty change request on manual input', () => {
      const rows = queryAllByTestAttr(el, 'products-table-row');
      const firstProduct = rows[0]
      const input = queryByTestAttr(firstProduct, 'qnty-input');
      expect(input).toBeTruthy();
      spyOn(component, 'onQuantityChangedWithNewVal');
      input.triggerEventHandler('change', { target: { value: '5' } });
      expect(component.onQuantityChangedWithNewVal).toHaveBeenCalledWith(5, 1);
    });
  });

  it('should sent product removal request on a remove button click', fakeAsync(() => {
    const rows = queryAllByTestAttr(el, 'products-table-row');
    const firstProduct = rows[0]
    const firstProductRemoveBtn = queryByTestAttr(firstProduct, 'remove-product-btn');
    expect(firstProductRemoveBtn).toBeTruthy();
    firstProductRemoveBtn.triggerEventHandler('click');
    tick(200);
    fixture.detectChanges();
    expect(productsFacadeSpy.removeProductFromList).toHaveBeenCalledTimes(1);
  }));

  it('should display correct total of all products in table footer', () => {
    const totalEl = queryByTestAttr(el, 'products-list-price-total');
    expect(totalEl).toBeTruthy();
    const total = totalEl.nativeElement.innerText;
    expect(total).toBe('$3,596.00');
  })
});
