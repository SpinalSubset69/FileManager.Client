import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!:User;
  spaceInUse = 0;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
      this.getUser();
  }


  getUser(){
    this.userService.getuser().subscribe(resp => {
      this.user = resp;
      this.spaceInUse = Number(this.user.spaceInUse);
    });
  }

}
