import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 
    '[contenteditable][formControlName],' +
    '[contenteditable][formControl],' +
    '[contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableDirective),
      multi: true
    }
  ]
})
export class ContenteditableDirective implements ControlValueAccessor {

  private onTouched = () => {};

  private onChange: (value: string) => void = () => {};

  constructor(private readonly _elementRef: ElementRef,
              private readonly _renderer: Renderer2) {

  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue(value: string) {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'innerText',
      value
    );
  }

  @HostListener('input')
  protected onInput() {
    this.onChange(this._elementRef.nativeElement.innerText);
  }

  @HostListener('blur')
  protected onBlur() {
      this.onTouched();
  }

}
