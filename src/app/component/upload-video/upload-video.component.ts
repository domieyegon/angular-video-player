import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
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
  form:FormGroup
  selectedFile: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private formBuilder: FormBuilder,private uploadVideoService: UploadVideoService) { }

  onFileChange(event) {
    this.selectedFile = event.target.files;
  }

  uploadFile() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile.item(0);
    this.uploadVideoService.uploadFile(this.currentFileUpload).subscribe(
      res => {
        if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.videoUploadedSuccess = true;
        }
      }
    );
  }

  ngOnInit() {
   
  }

}
