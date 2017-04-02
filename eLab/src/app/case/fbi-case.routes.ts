import { Routes, RouterModule } from '@angular/router';
import { FbiCasePage } from './fbi-case.page';

export const routes: Routes = [
  {
    path: 'case',
    component: FbiCasePage,
  },
];

export const routing = RouterModule.forChild(routes);
