import { Router } from '@angular/router';

import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout-register-page',
  templateUrl: './layout-register-page.component.html',
  styleUrls: ['./layout-register-page.component.css']
})
export class LayoutRegisterPageComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  firstName = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register(): void{
    debugger
    this.authService.register(this.form, this.firstName).subscribe(data => {
      console.log(data)
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      if(this.isSignUpFailed = true){
        this.isSuccessful = false;
      }
      if(this.isSuccessful = true){
        this.isSignUpFailed = false;
        setTimeout(()=>{
          this.router.navigateByUrl('/login')
        },3000)
      }
    },
    err =>
    {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    })
  }


}
