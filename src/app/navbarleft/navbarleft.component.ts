import { Router } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import {Component, OnInit} from '@angular/core';
import { RelationshipService } from '../_services/relationship.service';

@Component({
  selector: 'app-navbarleft',
  templateUrl: './navbarleft.component.html',
  styleUrls: ['./navbarleft.component.css']
})
export class NavbarleftComponent implements OnInit {

  idUserCurrent=  this.tokenStorage.getUser().id;

  relationship: any = {
    id:0
  };

  listFriendRequest: any = [];

  message: string = '';

  constructor(
    private tokenStorage: TokenStorageService,
    private serviceRelationship: RelationshipService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getMakeFriendRequest();
  }

  logout(){
    this.tokenStorage.signOut()
    if(this.tokenStorage.getToken() == null){
      this.router.navigateByUrl('/login')
    }
  }

  getMakeFriendRequest(){
    this.serviceRelationship.getMakeFriendRequest(this.idUserCurrent)
    .then(res => {
      this.listFriendRequest = res;
    }).catch(e => {
      this.message = 'bạn không có lời mời kết bạn nào';
    })
  }

 homefriend(idFriend){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/myfriend/'+ idFriend+'/timeline-friend-profile/'+ idFriend]));
}

gototimeline(){
  this.router.navigateByUrl('/timeline')
}

}
