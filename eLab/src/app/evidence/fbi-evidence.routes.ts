import { Routes, RouterModule } from '@angular/router';
import { FbiEvidencePage } from './fbi-evidence.page';

export const routes: Routes = [
  {
    path: 'evidence',
    children: [
      { path : 'new', component: FbiEvidencePage},
      { path : 'view/:id', component : FbiEvidencePage }
    ]
  },
];

export const routing = RouterModule.forChild(routes);
