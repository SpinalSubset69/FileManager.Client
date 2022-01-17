import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
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
    private toastr: ToastrService
  ) {
    this.loginInfo = new Login('', '');
  }

  ngOnInit(): void {
    if (this.authService.validateSession()) {
      console.log(this.authService.validateSession());
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
          this.toastr.error(respo, 'Error', {
            positionClass: 'toast-bottom-center',
          });
          return;
        }

        this.router.navigateByUrl('/user/home');
      },
      (err) => {
        this.spinner.hide();

        if (err.message.includes('Http failure')) {
          this.toastr.error(
            'Cannot stablish conection to the server',
            'Connection',
            {
              positionClass: 'toast-top-right',
            }
          );
        }
        console.log(err);
      }
    );
  }
}
