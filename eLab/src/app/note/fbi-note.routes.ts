import { Routes, RouterModule } from '@angular/router';
import { FBINotePage } from './fbi-note.component';
import { QDetailsPage } from './QDetails/qdetails.component';

export const routes: Routes = [
  {
    path: 'notes',
    children : [
      { path : 'shoe/new', component : FBINotePage},
      { path : 'shoe/view/:id', component : FBINotePage },
      { path : 'tire/new', component : FBINotePage},
      { path : 'tire/view/:id', component : FBINotePage},
      { path : 'qdetails/new', component : QDetailsPage},
      { path : 'qdetails/view/:id', component : QDetailsPage}
    ]
  },
];

export const routing = RouterModule.forChild(routes);
