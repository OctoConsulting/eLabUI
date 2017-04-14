import { Routes, RouterModule } from '@angular/router';
import { FBIExamPage } from './fbi-exam.component';

export const routes: Routes = [
  {
    path: 'exam',
    component: FBIExamPage,
  },
];

export const routing = RouterModule.forChild(routes);