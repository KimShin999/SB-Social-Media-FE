import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  user: any = {
  }
  id =  this.tokenStorage.getUser().id;
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
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

}
