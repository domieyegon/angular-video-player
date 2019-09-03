import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { VideoPlayerComponent } from './component/video-player/video-player.component';
import { UploadVideoComponent } from './component/upload-video/upload-video.component';


const appRoutes: Routes = [

    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },

    {
        path: '',
        component: VideoPlayerComponent
    },

    {
        path: '/upload',
        component: UploadVideoComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);