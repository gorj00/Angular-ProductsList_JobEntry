import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, ElementRef } from "@angular/core";
import { By } from "@angular/platform-browser";

export function queryAllByTestAttr<T>(
  debugElement: DebugElement,
  testAttr: string,
  cssPrepend: string = '',
  cssAppend: string = ''
): DebugElement[] {
  return debugElement.queryAll(By.css(cssPrepend + `[data-test="${testAttr}"]` + cssAppend));
}

export function queryByTestAttr<T>(
  debugElement: DebugElement,
  testAttr: string,
  cssAppend: string = ''
): DebugElement {
  return debugElement.query(By.css(`[data-test="${testAttr}"]` + cssAppend));
}

export function queryByCss<T>(
  debugElement: DebugElement,
  selector: string,
): DebugElement {
  return debugElement.query(By.css(selector));
}

export function testAttr(selector: string, cssAppend: string = '') {
  return `[data-test="${selector}"]` + cssAppend
}

export function click<T>(element: ElementRef, fixture?: ComponentFixture<T>) {
  const el: HTMLElement = element.nativeElement;
  el.click();
  if (fixture) fixture.detectChanges();
}
