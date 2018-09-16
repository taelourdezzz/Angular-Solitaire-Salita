import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayTableComponent } from './play-table/play-table.component';
import { HeaderDivisionComponent } from './header-division/header-division.component';
import { CardComponent } from './card/card.component';
import { WinBoxComponent } from './win-box/win-box.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayTableComponent,
    HeaderDivisionComponent,
    CardComponent,
    WinBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
