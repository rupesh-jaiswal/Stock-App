import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebsocketService } from './websocket.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
