import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-layout-timeline-page',
  templateUrl: './layout-timeline-page.component.html',
  styleUrls: ['./layout-timeline-page.component.css']
})
export class LayoutTimelinePageComponent implements OnInit {

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
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login')
    }
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
