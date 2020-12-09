import { LikeService } from './../_services/like.service';
import { ProfilePostService } from './../_services/profile-post.service';
import { PostService } from './../_services/post.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-timeline-profile',
  templateUrl: './timeline-profile.component.html',
  styleUrls: ['./timeline-profile.component.css']
})
export class TimelineProfileComponent implements OnInit {

  post: any = {
  };
  comment: any = {
    content: ''
  };
  roles: string[] = [];
  user: any = {};
  isLoggedIn = false;
  id =  this.tokenStorage.getUser().id;
  progressInfos: any =[];
  fileInfos: Observable<any>;
  selectedFiles: FileList;
  posts: any = [];
  checkGlobalLike: any = [];


  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private service: PostService,
    private profilePostService: ProfilePostService,
    private router: Router,
    private commentService: CommentService,
    private likeService: LikeService,
  ) { }
  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
    this.getAllPostByUser();
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

  selectFiles(event): void {
    this.progressInfos = [];
    const files = event.target.files;    let isImage = true;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
       event.srcElement.percentage = null;
    }
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  getAllPostByUser(){
    this.profilePostService.getAllPostByUser(this.id).subscribe(
      (data) =>{
        console.log(data);
        this.posts = data;
        for (let i = 0; i < this.posts.length; i++) {
          this.likeService.getIsLike(this.posts[i].id, this.id)
            .then(res => {
              this.checkGlobalLike[i] = {value : res};
              console.log(res)
            }).catch(e => {
              alert('Connection Error !');
            })
        }
      }
    )
  }

  updatePost(post){
    this.profilePostService.editPost(this.id, post).subscribe(
      (data) => {
        // this.post = data;
      }
    )
  }

  postComment(postId){
    this.commentService.postComment(this.id, postId, this.comment).subscribe(
      (data) => {
        this.posts.find(post => post.id == postId).comments.push(data);
        })
        this.comment.content = "";
  }

  upPost():void{
    this.profilePostService.createpost(this.post,this.id).
    then(res =>{
      this.posts.push(res);
      this.posts = this.posts.reverse();
      this.post.content ="";
      this.getAllPostByUser();
    }).catch(e => {
      console.log("ko dang dc");
    })
  }

  onChange(value) {
    this.comment.content = value;
  }

  editContent(value){
    this.comment = value
  }

  deletePost(id){
    this.profilePostService.deletePost(id).subscribe(
      (data) => {
       this.getAllPostByUser();
      })
  }

  editComment(comment){
    this.commentService.updateComment(comment,this.id).subscribe(
      (data) =>{
        console.log(data);
      }
    )
  }

  deleteComment(id){
    this.commentService.deleteComment(this.id,id).subscribe(
      (data) =>{
        this.getAllPostByUser();
      }
    )
  }


  eventLike(postId) {
    this.likeService.updateData(postId, this.id)
      .then(res => {
        this.getAllPostByUser();
      }).catch(e => {
        alert('Connection Error !');
      })

  }
  homeFriend(idFriend){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/myfriend/'+ idFriend+'/timeline-friend-profile/'+ idFriend]));
  }
}
