import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import RxPlayer from 'rx-player';
import { VideoPlayerService } from 'src/app/service/video-player.service';
import { Video } from 'src/app/model/video';
import { Params, ActivatedRoute, Router } from '@angular/router';


declare var videoControls: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  providers: [VideoPlayerService]
})
export class VideoPlayerComponent implements OnInit {

  private videoList: Video[];
  private video: Video = new Video();
  private videoQualities;
  private videoBitrates;
  private videoTrack;
  private player;
  private videoId: number;
  private videoUrl;
  private videoName;

 

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

      this.videoBitrates = this.player.getAvailableVideoBitrates();
      // this.videoTrack = this.player.getVideoTrack();
      // this.videoQualities = this.videoTrack.representations;
   
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
        // this.router.navigate(['/watch', id]);
         window.location.href ='/watch/'+id
        this.videoPlayer();
        this.videoName = video.videoOriginalName;
      }
    })

  }



  // play the next video when the current end
  playNextVideo(url) {
    let index = this.videoList.findIndex(vid => vid.videoUrl === url);
    let nextVideoIndex = 0;
    if ((index + 1) >= this.videoList.length) {
      nextVideoIndex = 0
    } else {
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
    videoControls();
    this.route.params.forEach((params: Params) => {
      const val = 'id';
      this.videoId = Number.parseInt(params[val], 10);
    });
    this.videoPlayerService.getVideo(this.videoId).subscribe(
      res => {
        this.video = res.json();
        this.videoUrl = this.video.videoUrl;
        this.videoName = this.video.videoOriginalName;
        this.videoPlayer();
      },
      err => {
        console.log(err);
      }
    );
    this.getVideoList();

  }

}