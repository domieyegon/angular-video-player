import { Component, OnInit } from '@angular/core';

import RxPlayer from 'rx-player';
import { VideoPlayerService } from 'src/app/service/video-player.service';
import { Video } from 'src/app/model/video';
import Player from 'rx-player/dist/_esm5.processed';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public videoList: Video[];
  public video: Video = new Video();

  constructor(private videoPlayerService: VideoPlayerService) { }

  videoPlayer(videoUrl) {
    // Video player instanciation
    const videoElement = document.querySelector('video');
    const player = new RxPlayer({videoElement});

    // play the video file
    player.loadVideo({
      // url: "http://localhost:8181/video/video-manifest.xml",
      // url: "http://vm2.dashif.org/livesim-dev/segtimeline_1/testpic_6s/Manifest.mpd",
      // transport: "dash",
      url : videoUrl,
      transport: "directfile", //Transport protocol can be "dash","smooth" or "directfile" 
      autoPlay: true
    });

    // check if the video loaded successfully
    player.addEventListener("playerStateChange", (state) => {

      //check if the state of the current video is ended.
      if(state==="ENDED") {
        player.dispose();
        this.playNextVideo(videoUrl);
      }

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
        this.videoList = res.json();
        this.videoPlayer(this.videoList[2].videoUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

   // play a video from the playlist on click
   playVideo(id) {
    this.videoList.forEach(video => {
      if (video.id === id) {
        this.videoPlayer(video.videoUrl);
        
      }
    })
  
  }

  // play the next video when the current end
  playNextVideo(url) {
    let index = this.videoList.findIndex(vid => vid.videoUrl === url);
      let nextVideoIndex = 0;
      console.log("index of the current video :"+index);
      console.log("length of the array :"+this.videoList.length);
      if ((index + 1) >= this.videoList.length) {
        nextVideoIndex = 0
        console.log("index of the current video :"+ 0)
      } else {
        console.log("index of the next video is :"+index+1);
        nextVideoIndex = index + 1;
      }
      this.videoPlayer(this.videoList[nextVideoIndex].videoUrl);
  }

  ngOnInit() {
    // this.videoPlayer();
    this.getVideoList();

  }

}
