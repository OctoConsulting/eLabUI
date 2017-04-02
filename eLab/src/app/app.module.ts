import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { FbiHeaderComponent } from './fbi-header/fbi-header.component';
import { FbiFooterComponent } from './fbi-footer/fbi-footer.component';
import { FbiErrorComponent } from './fbi-error/fbi-error.component';
import { FbiHomeComponent } from './home/fbi-home.component';

@NgModule({
  declarations: [
    AppComponent,
    FbiHeaderComponent,
    FbiFooterComponent,
    FbiErrorComponent,
    FbiHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
