import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-note.routes';
import { FBINoteComponent } from './fbi-note.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { KQTable } from './KQTable/kq-table.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    routing,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [

  ],
  declarations:[
    FBINoteComponent,
    KQTable
  ],
  providers: [
    
  ]
})
export class FbiNotesModule {

}