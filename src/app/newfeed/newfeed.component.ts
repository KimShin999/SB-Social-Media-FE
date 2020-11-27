import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  id =  this.tokenStorage.getUser().id;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
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

}
