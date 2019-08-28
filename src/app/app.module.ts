import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './component/video-player/video-player.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
