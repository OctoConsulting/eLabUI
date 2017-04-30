import { Routes, RouterModule } from '@angular/router';
import { FBINotePage } from './fbi-note.component';
import { QDetailsPage } from './QDetails/qdetails.component';
import { KDetailsPage } from './KDetails/k-details.component';

export const routes: Routes = [
  {
    path: 'notes',
    children : [
      { path : 'shoe/new/:examId', component : FBINotePage},
      { path : 'shoe/view/:examId/:id', component : FBINotePage },
      { path : 'tire/new/:examId', component : FBINotePage},
      { path : 'tire/view/:examId/:id', component : FBINotePage},
      { path : 'qdetails/new/:examId', component : QDetailsPage},
      { path : 'qdetails/view/:examId/:id', component : QDetailsPage},
      { path : 'shoe/kdetails/new/:examId', component : KDetailsPage},
      { path : 'shoe/kdetails/view/:examId/:id', component : KDetailsPage},
      { path : 'tire/kdetails/new/:examId', component : KDetailsPage},
      { path : 'tire/kdetails/view/:examId/:id', component : KDetailsPage},
    ]
  },
];

export const routing = RouterModule.forChild(routes);
