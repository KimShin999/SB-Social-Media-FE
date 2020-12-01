import { PostService } from './../_services/post.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newfeed',
  templateUrl: './newfeed.component.html',
  styleUrls: ['./newfeed.component.css']
})
export class NewfeedComponent implements OnInit {

  roles: string[] = [];
  user: any = {};
  isLoggedIn = false;
  id =  this.tokenStorage.getUser().id;
  progressInfos: any =[];
  fileInfos: Observable<any>;
  content: string;
  selectedFiles: FileList;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private service: PostService
  ) { }

  ngOnInit(): void {
    console.log(this.id)
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
        
      },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
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


  upPost():void{
    this.service.createpost(this.content)
  }

  selectFiles(event): void {
    debugger
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
}
