import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayerService } from 'src/app/service/video-player.service';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  public selectedVideo: Video;
  public videoList: Video[];
  private videoDuration;

  constructor(
    private videoPlayerService: VideoPlayerService,
    private router: Router
  ) { }

  playVideo(video: Video) {
    this.selectedVideo = video;
    this.router.navigate(['/watch', this.selectedVideo.id]);
  }

  getVideoList() {
    this.videoPlayerService.getVideoList().subscribe(
      res => {
        this.videoList = res.json();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getVideoList();
  }

}
