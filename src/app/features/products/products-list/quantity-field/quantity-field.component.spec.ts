import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { queryAllByTestAttr, queryByTestAttr } from 'src/utils/test.utils';
import { EProductQntyChange } from 'src/app/models/products.models';

import { QuantityFieldComponent } from './quantity-field.component';

describe('QuantityFieldComponent', () => {
  let component: QuantityFieldComponent;
  let fixture: ComponentFixture<QuantityFieldComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityFieldComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.quantity = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have quantity value of 2 in the component input', () => {
    expect(component.quantity).toBe(2);
  });

  it('should have quantity value of 2 in the template input', () => {
    const input = queryByTestAttr(el, 'qnty-input');
    expect(input.nativeElement.value).toContain('2');
  });

  it('should have template quantity appended with `x`', () => {
    const input = queryByTestAttr(el, 'qnty-input');
    expect(input.nativeElement.value).toContain('x');
  });

  it('should emit decrease action to the parent', () => {
    const btn = queryByTestAttr(el, 'qnty-decrease-btn');
    spyOn(component.quantityChangeByTypeAction, 'emit');
    btn.nativeElement.click();
    expect(btn).toBeTruthy();
    expect(component.quantityChangeByTypeAction.emit).toHaveBeenCalledWith({
      quantity: 2,
      type: EProductQntyChange.DECREASE,
    });
  });

  it('should emit increase action to the parent', () => {
    const btn = queryByTestAttr(el, 'qnty-increase-btn');
    spyOn(component.quantityChangeByTypeAction, 'emit');
    btn.nativeElement.click();
    expect(btn).toBeTruthy();
    expect(component.quantityChangeByTypeAction.emit).toHaveBeenCalledWith({
      quantity: 2,
      type: EProductQntyChange.INCREASE,
    });
  });

  it('should emit new qnty value action to the parent', () => {
    const input = queryByTestAttr(el, 'qnty-input');
    spyOn(component.quantityChangeByValueAction, 'emit');

    input.triggerEventHandler('change', { target: { value: '5' } });
    expect(input).toBeTruthy();
    expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(5);
  });

  describe('edge inputs for qnty template input `onChangeValue()`', () => {
    it('should allow zero', () => {
      const input = queryByTestAttr(el, 'qnty-input');
      spyOn(component.quantityChangeByValueAction, 'emit');
      expect(input).toBeTruthy();

      input.triggerEventHandler('change', { target: { value: '0' } });
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(0);
    });

    it('should ignore non-integer invalid inputs', () => {
      const input = queryByTestAttr(el, 'qnty-input');
      spyOn(component.quantityChangeByValueAction, 'emit');
      expect(input).toBeTruthy();

      input.triggerEventHandler('change', { target: { value: 'A' } });
      // the current quantity will be sent
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(2);
      input.triggerEventHandler('change', { target: { value: '+' } });
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(2);
      input.triggerEventHandler('change', { target: { value: '-1' } });
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(2);
      input.triggerEventHandler('change', { target: { value: '-5' } });
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(2);
      input.triggerEventHandler('change', { target: { value: '' } });
      expect(component.quantityChangeByValueAction.emit).toHaveBeenCalledWith(2);
    });
  });

});
