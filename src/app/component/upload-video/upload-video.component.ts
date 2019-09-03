import { Component, OnInit } from '@angular/core';
import { UploadVideoService } from 'src/app/service/upload-video.service';
import { Video } from 'src/app/model/video';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  public uploadVideo:Video = new Video();
  public videoUploadedSuccess:boolean;
  selectedFile: FileList;
  currentFileUpload: File;
  // progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadVideoService: UploadVideoService) { }

  onFileChange(event) {
    this.selectedFile = event.target.files;
  }

  uploadFile() {
    // this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile.item(0);

    this.uploadVideoService.uploadFile(this.currentFileUpload).subscribe(
      res => {
        console.log(res);
          console.log('File is completely uploaded!');
          this.videoUploadedSuccess = true;
      }
    );
  }

  ngOnInit() {
   
  }

}
