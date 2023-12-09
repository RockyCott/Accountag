import { Routes } from '@angular/router';
import { HomePage } from './home.page';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'folder/Inbox', pathMatch: 'full' },
      {
        path: 'folder/:id',
        loadChildren: () =>
          import('../../folder/folder.module').then((m) => m.FolderPageModule),
      },
      {
        path: '**',
        redirectTo: 'page-not-found',
      }
    ],
  },
];
