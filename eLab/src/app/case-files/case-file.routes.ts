import { Routes, RouterModule } from '@angular/router';
import { CaseFilesComponent } from './case-files.component';

export const routes: Routes = [
  {
    path: 'case-files',
    component: CaseFilesComponent,
  },
];

export const routing = RouterModule.forChild(routes);