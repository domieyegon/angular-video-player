import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  constructor(private http: HttpClient) { }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const url = "http://localhost:8181/api/file/upload/";

    const formdata: FormData = new FormData();

    formdata.append('file',file);

    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
