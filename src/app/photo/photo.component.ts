import {Component, OnInit} from '@angular/core';
import { ProfilePostService } from '../_services/profile-post.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  user: any = {
  }
  posts : any =[];
  images : any = [];
  id =  this.tokenStorage.getUser().id;
  constructor( 
    private userService: UserService,
    // private postService: profilePostService,
    private profileService: ProfilePostService,
    private tokenStorage: TokenStorageService,
    ){
  }
  ngOnInit(): void {
    this.profileService.getAllPostByUser(this.id).subscribe(
      data => {
        this.posts = data;
        this.posts.forEach(post => {
          post.images.forEach(image => {
            this.images.push(image);
          });
        });
      })
  }
  }