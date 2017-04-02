import { Routes, RouterModule } from '@angular/router';
import { FbiEvidencePage } from './fbi-evidence.page';

export const routes: Routes = [
  {
    path: 'evidence',
    component: FbiEvidencePage,
  },
];

export const routing = RouterModule.forChild(routes);
