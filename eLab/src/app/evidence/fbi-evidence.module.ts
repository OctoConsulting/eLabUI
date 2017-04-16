import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FBIEvidencePage } from './fbi-evidence.page';
import { routing } from './fbi-evidence.routes';

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
    FBIEvidencePage,

  ],
  providers: [

  ]
})
export class FBIEvidenceModule{

}
