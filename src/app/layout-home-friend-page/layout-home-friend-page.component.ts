import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { ProfilePostService } from '../_services/profile-post.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-layout-home-friend-page',
  templateUrl: './layout-home-friend-page.component.html',
  styleUrls: ['./layout-home-friend-page.component.css'],
})
export class LayoutHomeFriendPageComponent implements OnInit {
  idSearch: any;
  userSearch: any = {};

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private service: PostService,
    private profilePostService: ProfilePostService,
    private router: Router,
    private commentService: CommentService,
    private actRoute: ActivatedRoute
  ) {
    this.idSearch = parseInt(this.actRoute.snapshot.params.id);
    this.userService.getUserById(this.idSearch).subscribe(
      data => {
        this.userSearch = data;
      },
      err => {
        this.userSearch = JSON.parse(err.error).message;
      }
    );
    this.router.navigateByUrl('/myfriend/'+ this.idSearch+'/timeline-friend-profile/'+ this.idSearch);
    debugger
  }



  ngOnInit(): void {

  }
}
