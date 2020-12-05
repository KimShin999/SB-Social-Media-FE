import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelationshipService } from '../_services/relationship.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  @Input() ngSwitchCase: any

  searchUserName: String = "";

  checkBreak: number = 0;

  listUser: any = [];

  message: string = '';

  idSearch: any;
  userSearch: any = {};
  idUserCurrent=  this.tokenStorage.getUser().id;
  relationship: any = {
    id:0
  };
  listrelationship: any = [];
  checkrelationship: any = [];


  constructor(public router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private serviceRelationship: RelationshipService
    ) { }

  ngOnInit(): void {
  }

  onChange(value) {
    this.searchUserName = value;
    this.getalluserbyusername(this.searchUserName);
  }

  getalluserbyusername(name){
    this.userService.getalluserbyname(name, this.idUserCurrent)
      .then(res => {
        this.listUser = res;

        this.delay();
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


  delay(){
    this.getlistrelationship();
  }


  getlistrelationship(){
    this.serviceRelationship.getlistrelationship(this.idUserCurrent, this.listUser)
    .then(res => {
      this.listrelationship = res;
      this.checkListRelationship();
    }).catch(e => {
    })
  }

  checkListRelationship(){
    this.checkrelationship = []
    for(let i = 0 ; i < this.listUser.length; i++){
      for(let j = 0; j <this.listrelationship.length; j++ ){
        if(this.listUser[i].id == this.listrelationship[j].secondUser.id || this.listUser[i].id == this.listrelationship[j].firstUser.id ){
          if(this.listrelationship[j].status.id == 1){
            if(this.listrelationship[j].secondUser.id == this.listUser[i].id){
              this.checkrelationship.push(3);
              this.checkBreak = 1;
            }else{
              this.checkrelationship.push(1);
              this.checkBreak = 1;
            }
          }else if(this.listrelationship[j].status.id == 2){
            this.checkrelationship.push(2);
            this.checkBreak = 1;
          }
        }
      }
      if(this.checkBreak ==1){
        this.checkBreak = 0;
      }else{
        this.checkrelationship.push(0);
      }
    }
   }

  createrelationship(id2, i){
    this.serviceRelationship.createrelationship(this.idUserCurrent, id2)
    .then(res => {
      this.relationship = res;
      this.checkrelationship[i] = 1;
    }).catch(e => {
    })
  }

  deleterelationship(i){
    this.serviceRelationship.deleterelationship(this.listrelationship[i].id)
    .then(res => {
      this.checkrelationship[i] = 0;
    }).catch(e => {
    })
  }

  acceptFriend(i){
    this.serviceRelationship.acceptFriend(this.listrelationship[i].id)
    .then(res => {
      this.checkrelationship[i] = 2;
    }).catch(e => {
    })
    debugger
  }

}
