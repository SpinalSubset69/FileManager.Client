import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Login } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginInfo: Login;

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private toasts:ToastsService
  ) {
    this.loginInfo = new Login('', '');
  }

  ngOnInit(): void {
    if (this.authService.validateSession()) {
      this.router.navigateByUrl('/user/home');
    }
  }

  submitLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.spinner.show();

    this.authService.login(this.loginInfo).subscribe(
      (respo) => {
        this.spinner.hide();

        if (typeof respo === 'string') {
          this.toasts.ErrorToastr(respo, 'Error');
          return;
        }
        this.spinner.hide();
        this.router.navigateByUrl('/user/home');
      },
      (err) => {
        this.spinner.hide();
        this.toasts.ErrorToastr(err, 'Error');
      }
    );
  }
}
