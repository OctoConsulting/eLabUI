import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-note.routes';
import { FBINotePage } from './fbi-note.component';
import { NoteMainTable } from './note-main-table/note-main-table.component'; 
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { QDetailsPage } from './QDetails/qdetails.component';
import { KDetailsPage } from './KDetails/k-details.component';
import { EvidenceTable } from './evidence-table/evidence-table.component';



@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    routing,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  exports: [

  ],
  declarations:[
    FBINotePage,
    NoteMainTable,
    QDetailsPage,
    KDetailsPage,
    EvidenceTable
  ],
  providers: [
    
  ]
})
export class FbiNoteModule {

}
