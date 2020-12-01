import { Router } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbarleft',
  templateUrl: './navbarleft.component.html',
  styleUrls: ['./navbarleft.component.css']
})
export class NavbarleftComponent implements OnInit {

  constructor(
    private token: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.token.signOut()
    if(this.token.getToken() == null){
      this.router.navigateByUrl('/login')
    }
  }

}
