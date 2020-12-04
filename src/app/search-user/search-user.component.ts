import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RelationshipService } from '../_services/relationship.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  searchUserName: String = "";

  listUser: any = [];

  message: string = '';


  idUserCurrent=  this.tokenStorage.getUser().id;

  constructor(public router: Router,
    private service: UserService,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
  }

  onChange(value) {
    this.searchUserName = value;
    this.getalluserbyusername(this.searchUserName);
  }

  getalluserbyusername(name){
    debugger
    this.service.getalluserbyname(name, this.idUserCurrent)
      .then(res => {
        this.listUser = res;
        if(this.listUser.length == 0){
          this.listUser = [];
          this.message = 'no results found';
        }
        this.message = 'Search Results for ' + name ;
      }).catch(e => {
        this.listUser = [];
        this.message = 'no results found';
      })
  }

  homefriend(id){
     this.router.navigate(["myfriend",id]);
  }

}
