import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { colorSets } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;


  constructor(private userService: UserService, private router: Router, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getuser().subscribe((resp) => {
      this.user = resp;
    });

    this.router.navigateByUrl('/user/home/main');
    this.spinner.hide();
  }
}
