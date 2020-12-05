import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { ProfilePostService } from '../_services/profile-post.service';
import { RelationshipService } from '../_services/relationship.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-layout-home-friend-page',
  templateUrl: './layout-home-friend-page.component.html',
  styleUrls: ['./layout-home-friend-page.component.css'],
})
export class LayoutHomeFriendPageComponent implements OnInit {
  @Input() ngSwitchCase: any
  idSearch: any;
  userSearch: any = {};
  idUserCurrent=  this.tokenStorage.getUser().id;
  relationship: any = {
    id:0
  };
  checkrelationship: any;
  message: string = '';

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private serviceRelationship: RelationshipService
  ) {}


  ngOnInit(): void {
    this.idSearch = parseInt(this.actRoute.snapshot.params.id);
    this.getrelationship();
    this.userService.getUserById(this.idSearch).subscribe(
      data => {
        this.userSearch = data;
      },
      err => {
        this.userSearch = JSON.parse(err.error).message;
      }
    );
    this.router.navigateByUrl('/myfriend/'+ this.idSearch+'/timeline-friend-profile/'+ this.idSearch);
  }

  createrelationship(id2){
    this.serviceRelationship.createrelationship(this.idUserCurrent, id2)
    .then(res => {
      this.relationship = res;
      this.checkrelationship = 1;
    }).catch(e => {
      this.message = 'không tìm thấy kết quả';
    })
  }

  deleterelationship(id){
    this.serviceRelationship.deleterelationship(id)
    .then(res => {
      this.checkrelationship = 0;
    }).catch(e => {
      this.message = 'không tìm thấy kết quả';
    })
  }

  acceptFriend(){
    this.serviceRelationship.acceptFriend(this.relationship.id)
    .then(res => {
      this.checkrelationship = 2;
    }).catch(e => {
      this.message = 'không tìm thấy kết quả';
    })
  }

  getrelationship(){
    debugger
    this.serviceRelationship.getrelationship(this.idUserCurrent, this.idSearch)
    .then(res => {
      this.relationship = res;
      if(this.relationship.status.id == 1){
        if(this.relationship.secondUser.id == this.idUserCurrent){
          this.checkrelationship = 3;
        }else{
          this.checkrelationship = 1;
        }
      }else if(this.relationship.status.id == 2){
        this.checkrelationship = 2;}
    }).catch(e => {
      this.message = 'không tìm thấy kết quả';
      this.checkrelationship = 0;
    })
  }


}
