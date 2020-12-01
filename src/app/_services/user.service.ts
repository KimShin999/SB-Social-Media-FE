
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id): Observable<any> {
    return this.http.get(API_URL + 'getUserById/' + id);
  }
  getGender(): Observable<any> {
    return this.http.get(API_URL+'getAllGender');
  }
  changeInfoUser(user, id): Observable<any>{
    return this.http.put(API_URL + 'changeInfo/' + id, JSON.stringify(user),httpOptions)
  }

}
