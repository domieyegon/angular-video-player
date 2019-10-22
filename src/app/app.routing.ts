import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { VideoPlayerComponent } from './component/video-player/video-player.component';
import { UploadVideoComponent } from './component/upload-video/upload-video.component';
import { VideoListComponent } from './component/video-list/video-list.component';


const appRoutes: Routes = [

    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },

    {
        path: 'watch/:id',
        component: VideoPlayerComponent
    },

    {
        path: 'upload',
        component: UploadVideoComponent
    },

    {
        path: '',
        component: VideoListComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);