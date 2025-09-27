import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Page } from '../viewable-document.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-document-page',
  imports: [],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentPage {

  readonly page = input.required<Page>();

  protected readonly imageUrlPrefix = signal(environment.apiUrl);

}
