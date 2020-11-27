
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
  content: string;
  isLoggedIn = false;

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
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    }

}
