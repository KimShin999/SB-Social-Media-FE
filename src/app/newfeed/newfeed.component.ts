import { LikeService } from './../_services/like.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { ProfilePostService } from '../_services/profile-post.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-newfeed',
  templateUrl: './newfeed.component.html',
  styleUrls: ['./newfeed.component.css']
})
export class NewfeedComponent implements OnInit {

  roles: string[] = [];
  user: any = {};
  isLoggedIn = false;
  id = this.tokenStorage.getUser().id;
  progressInfos: any = [];
  fileInfos: Observable<any>;
  selectedFiles: FileList;
  listGlobalPost: any = [];
  checkGlobalLike: any = [];
  post: any = {
  };
  comment: any = {
    content: ''
  };
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private service: PostService,
    private profilePostService: ProfilePostService,
    private router: Router,
    private commentService: CommentService,
    private likeService: LikeService
  ) { }
  ngOnInit(): void {
    console.log(this.id)
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
    this.getAllGlobalPost();
  }
  upload(idx, file): void {
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
  upPost(): void {
    this.profilePostService.createpost(this.post, this.id).
      then(res => {
        this.getAllGlobalPost();
        this.listGlobalPost = this.listGlobalPost.reverse();
        this.listGlobalPost.push(res);
        this.listGlobalPost = this.listGlobalPost.reverse();
        this.checkGlobalLike = this.checkGlobalLike.reverse();
        this.checkGlobalLike.push({value: false});
        this.checkGlobalLike = this.checkGlobalLike.reverse();
        this.post.content = "";
      }).catch(e => {
        console.log("ko dang dc");
      })

      // this.checkGlobalLike.push({value: false});

  }
  selectFiles(event): void {
    this.progressInfos = [];
    const files = event.target.files; let isImage = true;
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

  postComment(postId) {
    this.commentService.postComment(this.id, postId, this.comment).subscribe(
      (data) => {
        this.listGlobalPost.find(post => post.id == postId).comments.push(data);
      })
    this.comment.content = "";
  }

  eventLike(postId) {
    this.likeService.updateData(postId, this.id)
      .then(res => {
        this. getAllGlobalPost();
      }).catch(e => {
      })

  }

  onChange(value) {
    this.comment.content = value;
  }

  getAllGlobalPost() {
    this.service.getGlobalPost()
      .then(res => {
        this.listGlobalPost = res;
        this.listGlobalPost = this.listGlobalPost.reverse();
        for (let i = 0; i < this.listGlobalPost.length; i++) {
          this.likeService.getIsLike(this.listGlobalPost[i].id, this.id)
            .then(res => {
              this.checkGlobalLike[i] = {value : res};
            }).catch(e => {
            })
        }
      }).catch(e => {
      })
  }

  editComment(comment){
    this.commentService.updateComment(comment,this.id).subscribe(
      (data) =>{
      }
    )
  }
  deleteComment(id){
    this.commentService.deleteComment(this.id,id).subscribe(
      (data) =>{
        this.getAllGlobalPost();
      }
    )
  }

  homefriend(idFriend){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/myfriend/'+ idFriend+'/timeline-friend-profile/'+ idFriend]));
}
}
