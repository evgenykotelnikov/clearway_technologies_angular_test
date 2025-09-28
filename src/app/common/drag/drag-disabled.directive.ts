import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appDragDisabled]',
  host: {
    '[style.cursor]': 'this.preserveCursorStyle() ? "" : "initial"'
  }
})
export class DragDisabledDirective {

  readonly preserveCursorStyle = input<boolean>(false);

}
