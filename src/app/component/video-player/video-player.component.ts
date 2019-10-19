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
  public video: Video = new Video();
  public videoQualities = [];


  constructor(private videoPlayerService: VideoPlayerService) { }

  videoPlayer(videoUrl) {
    // Video player instanciation
    const videoElement = document.querySelector('video');
    const player = new RxPlayer({ videoElement });

    const getVideoToPlay = {
      url: videoUrl,
      transport: "dash", //Transport protocol can be "dash","smooth" or "directfile" 
      autoPlay: false
    }
    // play the video file
    player.loadVideo(getVideoToPlay);

    // check if the video loaded successfully
    player.addEventListener("playerStateChange", (state) => {

      this.videoQualities = player.getAvailableVideoBitrates();

      // get the duration and convert the HH:MM:SS
      const pos = player.getPosition();
      const dur = player.getVideoDuration();
      console.log(new Date(pos * 1000).toISOString().substr(11, 8));
      console.log(new Date(dur * 1000).toISOString().substr(11, 8));
      console.log(`current position: ${pos} / ${dur}`);

      //check if the state of the current video is ended.
      if (state === "ENDED") {
        console.log("the video player is ended")
        this.playNextVideo(videoUrl);
      }
    });

    // check if error occured while loading the video file
    player.addEventListener("error", (err) => {
      console.log("the content stopped with the following error", err);
    });

  }

  selectQuality(quality) {
    console.log("selected quality is: " + quality);
    // player.setVideoBitrate(quality)
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
    console.log("index of the current video :" + index);
    console.log("length of the array :" + this.videoList.length);
    if ((index + 1) >= this.videoList.length) {
      nextVideoIndex = 0
      console.log("index of the current video :" + 0)
    } else {
      console.log("index of the next video is :" + index + 1);
      nextVideoIndex = 0;
    }
    this.videoPlayer(this.videoList[nextVideoIndex].videoUrl);
  }

  // request for videos from the backend
  getVideoList() {
    this.videoPlayerService.getVideoList().subscribe(
      res => {
        this.videoList = res.json();
        this.videoPlayer(this.videoList[0].videoUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    // this.videoPlayer();
    this.getVideoList();

  }

}