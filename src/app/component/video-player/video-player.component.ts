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

  constructor(private videoPlayerService: VideoPlayerService) { }

  videoPlayer() {
    // Video player instanciation
    const videoElement = document.querySelector('video');
    const player = new RxPlayer({ videoElement });

    // check if the video loaded successfully
    player.addEventListener("playerStateChange", (state) => {

      //check if the state of the current video is ended.
      if (state === "ENDED") {
        // this.playNextVideo();
      }
    });

    // play the video file
    player.loadVideo({
      // url: "http://localhost:8181/video/video-manifest.xml",
      url: "http://localhost:8181/api/file/Manifest.mpd",
      transport: "dash",
      // url : videoUrl,
      // transport: "directfile", //Transport protocol can be "dash","smooth" or "directfile" 
      autoPlay: true,
      // startAt:  {
      //   fromLastPosition: -30
      // }
    });

    // check if error occured while loading the video file
    player.addEventListener("error", (err) => {
      console.log("the content stopped with the following error", err);
    });
  }

  // play a video from the playlist on click
  playVideo(id) {
    this.videoList.forEach(video => {
      if (video.id === id) {
        // this.videoPlayer(video.videoUrl);

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
      nextVideoIndex = index + 1;
    }
    // this.videoPlayer(this.videoList[nextVideoIndex].videoUrl);
  }

  // requaest for videos from the backend
  getVideoList() {
    this.videoPlayerService.getVideoList().subscribe(
      res => {
        this.videoList = res.json();
        // this.videoPlayer(this.videoList[2].videoUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.videoPlayer();
    // this.getVideoList();

  }

}