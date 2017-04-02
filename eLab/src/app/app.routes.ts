import { Routes } from '@angular/router';
import { FbiErrorComponent } from './fbi-error/fbi-error.component';
import { FbiHomeComponent } from './home/fbi-home.component';

export let ROUTES: Routes = [
  { path: '', component: FbiHomeComponent},
  { path: '**',    component: FbiErrorComponent },
];
