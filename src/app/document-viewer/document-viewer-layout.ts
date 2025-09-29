import { Component, ElementRef, HostListener, Signal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { filter, map, switchMap } from 'rxjs';
import { indicateLoading } from '../utils/rxjs-operators.utils';
import { DocumentLoaderService } from './document-loader.service';
import { DocumentPage } from './document-page/document-page';
import { ViewableDocument } from './viewable-document.interface';

@Component({
  selector: 'app-document-viewer-layout',
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, MatProgressBar, DecimalPipe, DocumentPage],
  templateUrl: './document-viewer-layout.html',
  styleUrl: './document-viewer-layout.scss',
  providers: [DocumentLoaderService]
})
export class DocumentViewerLayout {
  protected readonly scale = signal(1);
  protected readonly documentElementOffset = signal(0);
  protected readonly document: Signal<ViewableDocument | undefined>;
  protected readonly busy = signal<boolean>(true);

  private readonly _documentContainer = viewChild.required<ElementRef<HTMLInputElement>>('documentContainer');

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _documentLoader: DocumentLoaderService) {

    const document$ = this._activatedRoute.paramMap.pipe(
      map(params => params.get('documentId')),
      filter((documentId): documentId is string => !!documentId),
      switchMap(documentId => this._documentLoader.load(documentId).pipe(
        indicateLoading(this.busy)
      ))
    );
    this.document = toSignal(document$);
  }

  protected save() {
    const document = this.document();
    if (!document)
      return;

    this._documentLoader.save(document);
  }

  @HostListener('document:keydown.+')
  protected onPlusKeyUp() {
    this.scaleDocument(0.01);
  }

  @HostListener('document:keydown.-')
  protected onMinusKeyUp() {
    this.scaleDocument(-0.01);
  }

  protected scaleDocument(scaleDelta: number) {
    const prevScale = this.scale();
    const currScale = prevScale + scaleDelta;
    if (currScale < 0)
      this.scale.set(0);
    else
      this.scale.set(currScale);

    this.calculateDocumentElementOffset(currScale);
    this.scrollByScale(prevScale, currScale);
  }

  private calculateDocumentElementOffset(currScale: number) {
    if (currScale >= 1) {
      this.documentElementOffset.set(0);
      return;
    }

    const currWidth = this._documentContainer().nativeElement.clientWidth * currScale;
    const offset = (this._documentContainer().nativeElement.clientWidth - currWidth) / 2;
    this.documentElementOffset.set(offset);
  }

  /**
   * Keep the center of screen stationary. It is not working at the end of scroll
   * because the browser doesn't have time to render the bottom part of page.
   * @param prevScale 
   * @param currScale 
   */
  private scrollByScale(prevScale: number, currScale: number) {
    const scaleRatio = currScale / prevScale;
    const halfWidth = this._documentContainer().nativeElement.clientWidth / 2;
    const halfHeight = this._documentContainer().nativeElement.clientHeight / 2;
    const centerXPosition = this._documentContainer().nativeElement.scrollLeft + halfWidth;
    const centerYPosition = this._documentContainer().nativeElement.scrollTop + halfHeight;
    const scrollLeft = centerXPosition * scaleRatio - halfWidth;
    const scrollTop = centerYPosition * scaleRatio - halfHeight;

    this._documentContainer().nativeElement.scrollTo(scrollLeft, scrollTop);
  }

}
