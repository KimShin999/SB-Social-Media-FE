import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/api/posts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  postComment(userId, id, comment): Observable<any>{
    return this.http.post(API_URL + 'postComment/' + userId +'/'+ id, JSON.stringify(comment), httpOptions)
  }


}
