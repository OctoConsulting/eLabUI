import { Routes, RouterModule } from '@angular/router';
import { FBINotePage } from './fbi-note.component';

export const routes: Routes = [
  {
    path: 'notes',
    children : [
      { path : 'shoe/new', component : FBINotePage},
      { path : 'shoe/view/:id', component : FBINotePage },
      { path : 'tire/new', component : FBINotePage},
      { path : 'tire/view/:id', component : FBINotePage}
    ]
  },
];

export const routing = RouterModule.forChild(routes);
