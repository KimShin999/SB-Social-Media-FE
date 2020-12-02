import {Component, OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navbarright',
  templateUrl: './navbarright.component.html',
  styleUrls: ['./navbarright.component.css']
})
export class NavbarrightComponent implements OnInit {

  listusers: any = [];

  constructor( private userService: UserService,) {

  }

  ngOnInit(): void {

  }

  getListUser(){

  }


}
