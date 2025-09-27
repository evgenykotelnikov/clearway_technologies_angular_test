import { ChangeDetectionStrategy, Component, ElementRef, HostListener, model, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Annotation, Page } from '../viewable-document.interface';
import { PageAnnotation } from "./page-annotation/page-annotation";

@Component({
  selector: 'app-document-page',
  imports: [PageAnnotation],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentPage {

  readonly page = model.required<Page>();

  protected readonly imageUrlPrefix = signal(environment.apiUrl);

  private readonly _pageContainer = viewChild.required<ElementRef<HTMLInputElement>>('pageContainer');

  @HostListener('click', ['$event'])
  protected addAnnotation(event: PointerEvent) {
    const currentAnnotations = this.page().annotations || [];
    const lastAnnotationId = currentAnnotations[currentAnnotations.length - 1]?.id || 0;

    const annotation: Annotation = {
      id: lastAnnotationId + 1,
      x: event.layerX,
      y: event.layerY,
      text: 'annotation'
    };

    const target = event.target as Node;
    if (!this._pageContainer().nativeElement.contains(target)) {
      annotation.x = event.layerX - this._pageContainer().nativeElement.offsetLeft;
    }

    this.page.update(page => {
      page.annotations = page.annotations || [];
      page.annotations.push(annotation);
      return page;
    });
  }

  protected removeAnnotation(annotation: Annotation) {
    this.page.update(page => {
      page.annotations = (page.annotations || []).filter(a => a !== annotation);
      return page;
    });
  }

}
