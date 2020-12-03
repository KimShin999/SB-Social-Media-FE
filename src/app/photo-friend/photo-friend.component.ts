import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { ProfilePostService } from '../_services/profile-post.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-photo-friend',
  templateUrl: './photo-friend.component.html',
  styleUrls: ['./photo-friend.component.css']
})
export class PhotoFriendComponent implements OnInit {
  idSearch: any;
  userSearch: any = {};
  posts: any = [];

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
      debugger
    this.profilePostService.getAllPostByUser(this.idSearch).subscribe(
      data => {
        this.posts = data;
      },
      err => {
        this.userSearch = JSON.parse(err.error).message;
      }
    );
      console.log(this.posts);

   }


  ngOnInit(): void {

  }

}
