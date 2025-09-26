import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'documents',
    children: [
      {
        path: ':documentId',
        loadComponent: () => import('./document-viewer/document-viewer-layout').then(c => c.DocumentViewerLayout)
      }
    ]
  }
];
