
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-layout-login-page',
  templateUrl: './layout-login-page.component.html',
  styleUrls: ['./layout-login-page.component.css']
})
export class LayoutLoginPageComponent implements OnInit {

  form: any = {
    username: "",
    password: ""
  };


  list: any = [
    'nam', "nữ"
  ];


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles.includes('ROLE_USER')){
        this.router.navigateByUrl('/timeline')
        }
    }
  }

  login(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles.includes('ROLE_USER')){
          this.router.navigateByUrl('/timeline')
          }
        },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
