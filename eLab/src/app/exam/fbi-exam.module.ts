import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-exam.routes';
import { FBIExamPage } from './fbi-exam.component';
import { EvidenceTable } from './evidence-table/evidence-table.component';
import { NoteTable } from './note-table/note-table.component';
import { FbiExamService } from '../api-kit/exam/fbi-exam.service';
import { WrapperService } from '../api-kit/wrapper.service';
import { FbiNotesService } from "../api-kit/notes/fbi-notes.service";


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
    FBIExamPage,
    EvidenceTable,
    NoteTable
  ],
  providers: [
    FbiExamService,
    WrapperService,
    FbiNotesService,
  ]
})
export class FbiExamModule {

}