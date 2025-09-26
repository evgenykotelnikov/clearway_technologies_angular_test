import { ChangeDetectionStrategy, Component, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DocumentLoaderService } from './document-loader.service';
import { environment } from '../../environments/environment.development';
import { DocumentViewer } from './document-viewer';
import { ViewableDocument } from './viewable-document.interface';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-document-viewer-layout',
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, DocumentViewer],
  templateUrl: './document-viewer-layout.html',
  styleUrl: './document-viewer-layout.scss',
  providers: [DocumentLoaderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerLayout {
  protected readonly title = signal(environment.title);
  protected readonly scale = signal(1);
  protected readonly document: Signal<ViewableDocument | undefined>;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _documentLoader: DocumentLoaderService) {

    const document$ = this._activatedRoute.paramMap.pipe(
      map(params => params.get('documentId')),
      filter((documentId): documentId is string => !!documentId),
      switchMap(documentId => this._documentLoader.load(documentId))
    );
    this.document = toSignal(document$);
  }

}
