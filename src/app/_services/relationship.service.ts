import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor( private http: HttpClient) { }

  createrelationship = (id1, id2): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/makeFriendRequest/${id1}/${id2}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  deleterelationship = (id1): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/unFriend/${id1}`;
      this.http.delete(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  checkrelationship = (id1, id2): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/checkRelationship/${id1}/${id2}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  getrelationship= (id1, id2): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/getRelationship/${id1}/${id2}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  getMakeFriendRequest= (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/getListFriendRequest/${id}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }


  acceptFriend= (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8080/api/relationships/friendResponse/${id}`;
      this.http.get(url)
      .subscribe(res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
}
