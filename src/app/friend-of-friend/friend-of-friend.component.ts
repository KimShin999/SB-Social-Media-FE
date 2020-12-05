import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../_services/friend.service';
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
  constructor(
    private friendService: FriendService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idSearch = parseInt(this.actRoute.snapshot.params.id);
    this.getListUser();
  }

  getListUser(){
    this.friendService.getListFriend(this.idSearch).subscribe(
      data => {
        this.listUsers = data;
    })
  }

  redirectTo(idFriend){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/myfriend/'+ idFriend+'/timeline-friend-profile/'+ idFriend]));
 }

}
