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
    // Video play instanciation
    const videoElement = document.querySelector('video');
    const player = new RxPlayer({videoElement});
    // play the video file
    player.loadVideo({
      url : videoUrl,
      transport: "directfile",
      autoPlay: true
    });

    // check if the video loaded successfully
    player.addEventListener("playerStateChange", (state) => {
      if (state === "LOADED") {
        console.log("the content is loaded");

        const videoBitrates = player.getAvailableVideoBitrates();
        if(videoBitrates.length) {
          console.log("bitrates of the current video :", videoBitrates.join(", "));
        }

        // toggle play/pause when the videoElement in clicked
        // videoElement.onclick = function() {
        //   if(player.getPlayerState() === "PLAYING") {
        //     player.pause();
        //   }else {
        //     player.play();
        //   }
        // }

        
      }
    });

    // check if error occured while loading the video file
    player.addEventListener("error", (err) => {
      console.log("the content stopped with the following error", err);
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
