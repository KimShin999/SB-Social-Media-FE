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
    debugger
    return this.http.post(API_URL + 'postComment/' + userId +'/'+ id, JSON.stringify(comment), httpOptions)
  }
  updateComment(comment,idUser): Observable<any>{
    return this.http.put(API_URL+ 'updateComment/'+ idUser, JSON.stringify(comment),httpOptions)
  }

  deleteComment(idUser, commentId){
    return this.http.delete(API_URL+ 'deleteComment/' +idUser+ '/'+commentId, httpOptions)
  }

}
