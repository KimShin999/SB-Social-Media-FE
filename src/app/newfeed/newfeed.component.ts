import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-newfeed',
  templateUrl: './newfeed.component.html',
  styleUrls: ['./newfeed.component.css']
})
export class NewfeedComponent implements OnInit {



  content: ""



  selectedFiles: FileList;
  progressInfos = [];



  fileInfos: Observable<any>;

  constructor(private  service : PostService) { }

  ngOnInit(): void {
    // this.fileInfos = this.service.getFiles();
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
}
