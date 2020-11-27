import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';
  upload(file: File): Observable<HttpEvent<any>> {
    debugger
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/api/posts/imgPost`, formData,{
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  createpost = (content: String): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/posts/createpost/${content}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
