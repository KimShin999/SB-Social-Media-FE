import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/likes/';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  updateData = (postId, userId): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'update/' + postId + '/' + userId;
      console.log(url);
      this.http.get(url)
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  // getCountLike = (postId): Promise<Object> => {
  //       return new Promise((resolve, reject) => {
  //           let url = API_URL + 'countLike/' + postId;
  //           this.http.get(url)
  //               .subscribe(res => {
  //                   resolve(res);
  //               }, err => {
  //                 window.alert("service loi");
  //                   reject(err);
  //               })
  //       })
  //     }
  getIsLike = (postId, userId): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'checkLike/' + postId + '/' + userId;
      console.log(url);
      this.http.get(url)
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
}
 