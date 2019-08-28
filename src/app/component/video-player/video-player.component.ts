import { Component, OnInit } from '@angular/core';

import RxPlayer from 'rx-player';
import { VideoPlayerService } from 'src/app/service/video-player.service';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public videoList: Video[];

  constructor(private videoPlayerService: VideoPlayerService) { }

  videoPlayer(videoUrl) {
    const videoElement = document.querySelector('video');
    const player = new RxPlayer({videoElement});

    player.loadVideo({
      url : videoUrl,
      transport: "directfile",
      autoPlay: true
    });
  }


  getVideoList() {
    this.videoPlayerService.getVideoList().subscribe(
      res => {
        console.log(res);
        this.videoList = res.json();
        // console.log(this.videoList[1].videoUrl);
        this.videoPlayer(this.videoList[1].videoUrl);
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
