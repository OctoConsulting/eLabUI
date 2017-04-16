import { Routes, RouterModule } from '@angular/router';
import { FBIExamPage } from './fbi-exam.component';

export const routes: Routes = [
  {
    path: 'exam',
    children : [
      { path : 'new', component : FBIExamPage},
      { path : 'view/:id', component : FBIExamPage }
    ]
  },
];

export const routing = RouterModule.forChild(routes);