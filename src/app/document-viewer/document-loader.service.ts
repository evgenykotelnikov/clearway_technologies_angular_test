import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoggerService } from '../services/logger/logger.service';
import { ViewableDocument } from './viewable-document.interface';

@Injectable()
export class DocumentLoaderService {
  
  constructor(private readonly _httpClient: HttpClient,
              private readonly _logger: LoggerService
  ) {
    
  }

  load(documentId: string): Observable<ViewableDocument> {
    return this._httpClient.get<ViewableDocument>(environment.apiUrl + documentId + '.json').pipe(
      catchError(this.catchError.bind(this))
    );
  }

  save(document: ViewableDocument): Observable<ViewableDocument> {
    this._logger.info(document);
    return of(document);
  }

  private catchError(error: any): Observable<never> {
    this._logger.error('Ошибка получения документа', error);
    return EMPTY;
  }
}
