import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'documents',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '1'
      },
      {
        path: ':documentId',
        loadComponent: () => import('./document-viewer/document-viewer-layout').then(c => c.DocumentViewerLayout)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'documents/1'
  }
];
