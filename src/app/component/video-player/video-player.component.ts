import { Component, OnInit } from '@angular/core';

import RxPlayer from 'rx-player';
import { VideoPlayerService } from 'src/app/service/video-player.service';
import { Video } from 'src/app/model/video';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public videoList: Video[];
  public video: Video = new Video();
  public videoQualities = [];
  private player;
  private videoId: number;
  private videoUrl


  constructor(
    private videoPlayerService: VideoPlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  videoPlayer() {
    // Video player instanciation
    const videoElement = document.querySelector('video');
    this.player = new RxPlayer({ videoElement });

    const getVideoToPlay = {
      url: this.videoUrl,
      transport: "dash", //Transport protocol can be "dash","smooth" or "directfile" 
      autoPlay: false
    }
    // play the video file
    this.player.loadVideo(getVideoToPlay);

    // check if the video loaded successfully
    this.player.addEventListener("playerStateChange", (state) => {

      this.videoQualities = this.player.getAvailableVideoBitrates();

      // get the duration and convert the HH:MM:SS
      const pos = this.player.getPosition();
      const dur = this.player.getVideoDuration();
      console.log(new Date(pos * 1000).toISOString().substr(11, 8));
      console.log(new Date(dur * 1000).toISOString().substr(11, 8));
      console.log(`current position: ${pos} / ${dur}`);

      //check if the state of the current video is ended.
      if (state === "ENDED") {
        console.log("the video player is ended")
        // this.playNextVideo(videoUrl);
      }
    });

    // check if error occured while loading the video file
    this.player.addEventListener("error", (err) => {
      console.log("the content stopped with the following error", err);
    });

  }

  selectQuality(quality) {
    this.player.setVideoBitrate(quality)
  }

  // play a video from the playlist on click
  playVideo(id) {
    this.videoList.forEach(video => {
      if (video.id === id) {
        this.videoUrl = video.videoUrl;
        this.router.navigate(['/watch', id]);
        this.videoPlayer();
        
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
    // this.videoPlayer(this.videoList[nextVideoIndex].videoUrl);
  }

  // request for videos from the backend
  getVideoList() {
    this.videoPlayerService.getVideoList().subscribe(
      res => {
        this.videoList = res.json();
        // this.videoPlayer(this.videoList[0].videoUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const val = 'id';
      this.videoId = Number.parseInt(params[val], 10);
    });
    this.videoPlayerService.getVideo(this.videoId).subscribe(
      res => {
        this.video = res.json();
        this.videoUrl = this.video.videoUrl;
        this.videoPlayer();
      },
      err => {
        console.log(err);
      }
    );
    this.getVideoList();

  }

}