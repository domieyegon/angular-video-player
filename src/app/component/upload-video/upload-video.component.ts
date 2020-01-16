import { Component, OnInit } from '@angular/core';
import { UploadVideoService } from 'src/app/service/upload-video.service';
import { Video } from 'src/app/model/video';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  public uploadVideo: Video = new Video();
  public selectedFile: FileList;
  public currentFileUpload: File;
  public uploadResponse;
  public progress: { percentage: number } = { percentage: 0 };

  constructor (
    private uploadVideoService: UploadVideoService,
    private titleService: Title
  ) { }

  onFileChange(event) {
    this.selectedFile = event.target.files;
  }

  uploadFile() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile.item(0);

    this.uploadVideoService.uploadFile(this.currentFileUpload).subscribe(
      res => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * res.loaded / res.total);
          console.log(this.progress.percentage);
        } else if (res instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      }
    );
  }

  ngOnInit() {
    this.titleService.setTitle("Video Upload");
  }

}
