import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  roles: string[] = [];
  user: any = {};
  isLoggedIn = false;
  id = this.tokenStorage.getUser().id;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  listGender: any = []
  editInfoForm: FormGroup;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {

   }

  ngOnInit(): void {
    // console.log(this.id)
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );

    this.editInfoForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required],[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    })
  }

  public onFileChanged(event) {
    //Select File
    debugger
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  public onFileChangedCover(event){
    this.selectedFile = event.target.files[0];
    this.uploadCover();
  }

  uploadCover(){
    const coverImg = new FormData();
    coverImg.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.put('http://localhost:8080/api/users/updateCover/' + this.id, coverImg, { observe: 'response' })
    .subscribe((response) => {
      console.log(response);
      this.user = response.body;
    }
    );
  }

  onUpload() {
    console.log(this.selectedFile);
    debugger
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.http.put('http://localhost:8080/api/users/updateAvatar/' + this.id, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        console.log(response);
        this.user = response.body;
      }
      );
  }
  getGender() {
    this.userService.getGender()
      .subscribe(
        (response) => {
          this.listGender = response;
          console.log(this.listGender);
        }, error => {
          console.log(error)
        }
      )
  }

  changeInfo(){
    this.userService.changeInfoUser(this.user,this.id).subscribe(
      (data) => {
        data = this.user;
      }
    )
  }

}
