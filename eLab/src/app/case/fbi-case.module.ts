import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-case.routes';
import { FbiCasePage } from './fbi-case.page';
import { FBITable } from './fbi-table/fbi-table.component';
import { FBIExamTable } from './fbi-exam-table/fbi-exam-table.component';

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
    FbiCasePage,
    FBITable,
    FBIExamTable,
  ],
  providers: [

  ]
})
export class FbiCaseModule {

}
