import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './fbi-case.routes';
import { FbiCasePage } from './fbi-case.page';
import { FBITable } from './fbi-table/fbi-table.component';
import { FBIExamTable } from './fbi-exam-table/fbi-exam-table.component';
import { WrapperService } from '../api-kit/wrapper.service';
import { FbiCaseService } from '../api-kit/case/fbi-case.service';
import { FbiEvidenceService } from '../api-kit/evidences/fbi-evidences.service';
import { FbiExamService } from '../api-kit/exam/fbi-exam.service';

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
    WrapperService,
    FbiCaseService,
    FbiEvidenceService,
    FbiExamService,
  ]
})
export class FbiCaseModule {

}
