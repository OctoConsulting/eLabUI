import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { AppComponent } from './app.component';
import { FbiHeaderComponent } from './fbi-header/fbi-header.component';
import { FbiFooterComponent } from './fbi-footer/fbi-footer.component';
import { FbiErrorComponent } from './fbi-error/fbi-error.component';
import { FbiHomeComponent } from './home/fbi-home.component';
import { FbiCaseModule } from './case/fbi-case.module';
import { FbiEvidenceModule } from './evidence/fbi-evidence.module';
import { FBISideNav } from './fbi-sidenav/fbi-sidenav.component';
import { FbiExamModule } from './exam/fbi-exam.module';
import { FbiNoteModule } from './note/fbi-note.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { CaseFileModule } from './case-files/case-files.module';

@NgModule({
  declarations: [
    AppComponent,
    FbiHeaderComponent,
    FbiFooterComponent,
    FbiErrorComponent,
    FbiHomeComponent,
    FBISideNav,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontAwesomeModule,
    RouterModule.forRoot(ROUTES),
    FbiCaseModule,
    FbiEvidenceModule,
    FbiExamModule,
    FbiNoteModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    CaseFileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
