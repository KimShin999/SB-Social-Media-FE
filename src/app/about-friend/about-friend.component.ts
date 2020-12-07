import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-about-friend',
  templateUrl: './about-friend.component.html',
  styleUrls: ['./about-friend.component.css']
})
export class AboutFriendComponent implements OnInit {
  idSearch: any;
  userSearch: any = {};
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idSearch = parseInt(this.actRoute.snapshot.params.id);
    this.userService.getUserById(this.idSearch).subscribe(
      data => {
        this.userSearch = data;
      },
      err => {
        this.userSearch = JSON.parse(err.error).message;
      }
    );
  }

}
