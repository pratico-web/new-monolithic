import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { PraticoCodeEditor } from '@pratico/ngx-code-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PraticoBrowserModule } from "./modules/browser/pratico-browser-module";
// import { PraticoBrowserModule } from '@pratico/ngx-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PraticoBrowserModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
