import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/api/posts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfilePostService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPostByUser(id):Observable<any>{
    return this.http.get(API_URL+ 'getAllPostsByUser/' + id)
  }
  
  createpost = (post: any, id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/posts/createpost/${id}`;
      this.http.post(url, post)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
  editPost(id, post): Observable<any>{
    return this.http.put(API_URL+ 'updatePost/'+ id, JSON.stringify(post), httpOptions)
  }

  deletePost(id): Observable<any>{
    return this.http.delete(API_URL+ 'deletePost/' + id, httpOptions)
  }


}
