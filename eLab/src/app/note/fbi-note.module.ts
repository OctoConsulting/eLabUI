import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-note.routes';
import { FBINotePage } from './fbi-note.component';
import { NoteMainTable } from './note-main-table/note-main-table.component'; 


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  exports: [

  ],
  declarations:[
    FBINotePage,
    NoteMainTable
  ],
  providers: [
    
  ]
})
export class FbiNoteModule {

}
