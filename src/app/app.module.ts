import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './component/video-player/video-player.component';

import { routing } from './app.routing';
import { UploadVideoComponent } from './component/upload-video/upload-video.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { VideoListComponent } from './component/video-list/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    UploadVideoComponent,
    NavBarComponent,
    VideoListComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
