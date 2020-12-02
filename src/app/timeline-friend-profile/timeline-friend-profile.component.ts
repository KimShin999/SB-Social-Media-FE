import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Identifier } from 'typescript';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { ProfilePostService } from '../_services/profile-post.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-timeline-friend-profile',
  templateUrl: './timeline-friend-profile.component.html',
  styleUrls: ['./timeline-friend-profile.component.css']
})
export class TimelineFriendProfileComponent implements OnInit {

  @Input() id;

  post: any = {
  };
  comment: any = {
    content: ''
  };
  roles: string[] = [];
  isLoggedIn = false;
  idSearch:any;
  userSearch: any = {};
  idUserCurrent: number= this.tokenStorage.getUser().id;
  userCurrent: any = {};
  progressInfos: any =[];
  fileInfos: Observable<any>;
  selectedFiles: FileList;
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

    this.userService.getUserById(this.idUserCurrent).subscribe(
      data => {
        this.userCurrent = data;
      },
      err => {
        this.userCurrent = JSON.parse(err.error).message;
      }
    );
    this.getAllPostByUser();
  }

  ngOnInit(): void {


    }

  upload(idx, file): void {
    debugger
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.service.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.service.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
      });
    }


  // upPost():void{
  //   this.profilePostService.createpost(this.post,this.id).
  //   then(res =>{
  //     this.posts.push(res);
  //     this.posts = this.posts.reverse();
  //     this.post.content ="";
  //   }).catch(e => {
  //     console.log("ko dang dc");
  //   })
  // }

  // selectFiles(event): void {
  //   this.progressInfos = [];
  //   const files = event.target.files;    let isImage = true;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files.item(i).type.match('image.*')) {
  //       continue;
  //     } else {
  //       isImage = false;
  //       alert('invalid format!');
  //       break;
  //     }
  //   }

  //   if (isImage) {
  //     this.selectedFiles = event.target.files;
  //   } else {
  //     this.selectedFiles = undefined;
  //      event.srcElement.percentage = null;
  //   }
  //   for (let i = 0; i < this.selectedFiles.length; i++) {
  //     this.upload(i, this.selectedFiles[i]);
  //   }
  // }

  getAllPostByUser(){
    this.profilePostService.getAllPostByUser(this.idSearch).subscribe(
      (data) =>{
        console.log(data);
        this.posts = data;
      }
    )
  }

  // updatePost(post){
  //   this.profilePostService.editPost(this.id, post).subscribe(
  //     (data) => {
  //       this.post = data;
  //     }
  //   )
  // }

  onChange(value) {
    this.comment.content = value;
  }

  postComment(postId){
    debugger
    this.commentService.postComment(this.idUserCurrent, postId, this.comment).subscribe(
      (data) => {
        this.posts.find(post => post.id == postId).comments.push(data);
        })
        this.comment.content = "";
      }


}
