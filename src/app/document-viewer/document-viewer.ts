import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ViewableDocument } from './viewable-document.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-document-viewer',
  imports: [],
  templateUrl: './document-viewer.html',
  styleUrl: './document-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewer {

  readonly document = input.required<ViewableDocument>();

  protected readonly imageUrlPrefix = signal(environment.apiUrl);

}
