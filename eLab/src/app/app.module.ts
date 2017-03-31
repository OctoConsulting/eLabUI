import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FbiHeaderComponent } from './fbi-header/fbi-header.component';
import { FbiFooterComponent } from './fbi-footer/fbi-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FbiHeaderComponent,
    FbiFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
