import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SignUp } from 'src/app/shared/models/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupInfo: SignUp;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.signupInfo = new SignUp('', '', '');
  }

  ngOnInit(): void {}

  submitSignUp(form:NgForm){
    if(form.invalid){
      return;
    }

    this.spinner.show();

    this.authService.signUp(this.signupInfo).subscribe(resp => {
      this.spinner.hide();

      this.router.navigateByUrl('/login');
    }, err => {

      this.spinner.hide();
      if(err.message.includes('Http failure')){
        this.toastr.error('Cannot stablish conection to the server', 'Connection', {
          positionClass: 'toast-top-right'
        })
      }
    });
  }
}
