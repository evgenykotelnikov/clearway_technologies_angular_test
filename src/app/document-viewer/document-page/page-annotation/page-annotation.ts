import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ContenteditableDirective } from '../../../common/contenteditable.directive';
import { Annotation } from '../../viewable-document.interface';

@Component({
  selector: 'app-page-annotation',
  imports: [FormsModule, MatIcon, ContenteditableDirective],
  templateUrl: './page-annotation.html',
  styleUrl: './page-annotation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageAnnotation {

  readonly annotation = input.required<Annotation>();
  readonly remove = output<Annotation>();

  @HostListener('click', ['$event'])
  protected onClick(event: PointerEvent) {
    event.stopPropagation();
  }

}
