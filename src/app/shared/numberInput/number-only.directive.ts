import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  NgModule,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[NumberInput]',
})
export class NumberDirective {
  previousValue: any = '';
  @Input() includeKeyCodes: Array<number> = [];

  constructor(
    private _el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event']) input(e?: any) {
    let input = e.target;
    if (!input.value.startsWith('0') && !parseFloat(input.value)) {
      this.previousValue = null;
      input.value = null;
      return this.ngControl.control?.setValue('');
    }
    let numbers: number[] = this.includeKeyCodes.includes(46)
      ? input.value.match(/(\d+?)+\.?(\d+)?/g)
      : input.value.match(/\d+/g);

    if (numbers && numbers.length) {
      let no = numbers.join('');
      this.previousValue = no;
      input.value = no;
      this.ngControl.control?.setValue(no);
    }
  }

  @HostListener('keypress', ['$event']) keypress(e?: any) {
    if (
      this.includeKeyCodes.length &&
      this.includeKeyCodes.includes(e.keyCode)
    ) {
      return;
    }
    if (e.keyCode < 48 || e.keyCode > 58) {
      return this.setPreviousValue(e);
    }
  }

  setPreviousValue(e?: any) {
    e.target.value = this.previousValue;
    this.ngControl.control?.setValue(this.previousValue);
  }
}

@NgModule({
  declarations: [NumberDirective],
  exports: [NumberDirective],
})
export class NumberDirectiveModule {}
