
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void{
    this.authService.register(this.form).subscribe(data => {
      console.log(data)
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      if(this.isSignUpFailed = true){
        this.isSuccessful = false;
      }
      if(this.isSuccessful = true){
        this.isSignUpFailed = false;
      }
      this.form = {};
    },
    err =>
    {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    })
  }


}
