import { Routes, RouterModule } from '@angular/router';
import { FBINotePage } from './fbi-note.component';
import { QDetailsPage } from './QDetails/qdetails.component';
import { KDetailsPage } from './KDetails/k-details.component';

export const routes: Routes = [
  {
    path: 'notes',
    children : [
      { path : 'shoe/new', component : FBINotePage},
      { path : 'shoe/view/:id', component : FBINotePage },
      { path : 'tire/new', component : FBINotePage},
      { path : 'tire/view/:id', component : FBINotePage},
      { path : 'qdetails/new', component : QDetailsPage},
      { path : 'qdetails/view/:id', component : QDetailsPage},
      { path : 'kdetails/shoe/new', component : KDetailsPage},
      { path : 'kdetails/shoe/view/:id', component : KDetailsPage},
      { path : 'kdetails/tire/new', component : KDetailsPage},
      { path : 'kdetails/tire/view/:id', component : KDetailsPage},
    ]
  },
];

export const routing = RouterModule.forChild(routes);
