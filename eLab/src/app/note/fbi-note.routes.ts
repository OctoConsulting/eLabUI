import { Routes, RouterModule } from '@angular/router';
import { FBINoteComponent } from './fbi-note.component';

export const routes: Routes = [
  {
    path: 'notes',
    children : [
      { path : 'shoe/new', component : FBINoteComponent},
      { path : 'shoe/view/:id', component : FBINoteComponent },
      { path : 'tire/new', component : FBINoteComponent},
      { path : 'tire/view/:id', component : FBINoteComponent},
    ]
  },
];

export const routing = RouterModule.forChild(routes);