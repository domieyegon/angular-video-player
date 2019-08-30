import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { VideoPlayerComponent } from './component/video-player/video-player.component';


const appRoutes: Routes = [

    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },

    {
        path: '',
        component: VideoPlayerComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);