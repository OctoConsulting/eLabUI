import { Routes, RouterModule } from '@angular/router';
import { FBIEvidencePage } from './fbi-evidence.page';

export const routes: Routes = [
  {
    path: 'evidence',
    children: [
      { path : 'new', component: FBIEvidencePage},
      { path : 'view/:id', component : FBIEvidencePage }
    ]
  },
];

export const routing = RouterModule.forChild(routes);
