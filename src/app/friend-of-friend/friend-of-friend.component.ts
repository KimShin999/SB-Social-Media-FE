import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../_services/friend.service';
import { RelationshipService } from '../_services/relationship.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-friend-of-friend',
  templateUrl: './friend-of-friend.component.html',
  styleUrls: ['./friend-of-friend.component.css']
})
export class FriendOfFriendComponent implements OnInit {
  listUsers: any = [];
  idSearch: any;
  userSearch: any = {};
  idUserCurrent=  this.tokenStorage.getUser().id;
  relationship: any = {
    id:0
  };


  listrelationship: any = [];
  checkrelationship: any = [];
  checkBreak: number = 0;
  constructor(
    private friendService: FriendService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private serviceRelationship: RelationshipService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.idSearch = parseInt(this.actRoute.snapshot.params.id);
    this.getListUser();
  }

  getListUser(){
    this.friendService.getListFriend(this.idSearch).subscribe(
      data => {
        this.listUsers = data;
        this.delay();
    })
  }

  delay(){
    this.getlistrelationship();
  }


  getlistrelationship(){
    this.serviceRelationship.getlistrelationship(this.idUserCurrent, this.listUsers)
    .then(res => {
      this.listrelationship = res;
      this.checkListRelationship();
    }).catch(e => {
    })
  }

  homefriend(idFriend){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/myfriend/'+ idFriend+'/timeline-friend-profile/'+ idFriend]));
 }

 checkListRelationship(){
  this.checkrelationship = []
  for(let i = 0 ; i < this.listUsers.length; i++){
    for(let j = 0; j <this.listrelationship.length; j++ ){
      if(this.listUsers[i].id == this.listrelationship[j].secondUser.id || this.listUsers[i].id == this.listrelationship[j].firstUser.id ){
        if(this.listrelationship[j].status.id == 1){
          if(this.listrelationship[j].secondUser.id == this.listUsers[i].id){
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
}

}
