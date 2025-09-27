import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ViewableDocument } from './viewable-document.interface';

@Injectable()
export class DocumentLoaderService {
  
  constructor(private readonly _httpClient: HttpClient) {
    
  }

  load(documentId: string): Observable<ViewableDocument> {
    return this._httpClient.get<ViewableDocument>(environment.apiUrl + documentId + '.json').pipe(
      catchError(this.catchError)
    );
  }

  save(document: ViewableDocument): Observable<ViewableDocument> {
    console.log(document);
    return of(document);
  }

  private catchError(error: any): Observable<never> {
    console.error('Ошибка получения документа', error);
    return EMPTY;
  }
}
