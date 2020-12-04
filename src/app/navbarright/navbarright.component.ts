import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { FriendService } from '../_services/friend.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-navbarright',
  templateUrl: './navbarright.component.html',
  styleUrls: ['./navbarright.component.css']
})
export class NavbarrightComponent implements OnInit {
  id =  this.tokenStorage.getUser().id;
  listUsers: any = [];
  constructor( 
    private friendService: FriendService,
    private tokenStorage: TokenStorageService,
    private router: Router
    ) {
  }
  ngOnInit(): void {
    this.getListUser();
  }
  getListUser(){
    this.friendService.getListFriend(this.id).subscribe(
      data => {
        this.listUsers = data;
    })
  }

  navigateToFriendHome(id){
    this.router.navigateByUrl('/myfriend/'+ id+'/timeline-friend-profile/'+ id);
  }
}