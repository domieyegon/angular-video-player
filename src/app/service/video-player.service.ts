import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  constructor(private http: Http) { }

  getVideoList() {
    const url = 'http://localhost:8181/api/videos';

    const headers = new Headers({
      'content-type': 'application/json'
    });

   return this.http.get(url, {headers:headers});
  }

  getVideo(id: number) {

    const url = 'http://localhost:8181/api/video/' + id;
    const headers = new Headers ({
      'Content-Type': 'application/json'
    });

    return this.http.get(url, {headers});
  }
}
