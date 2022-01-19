import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploadRequest } from 'src/app/shared/models/fileUploadRequest';
import { SignUp } from 'src/app/shared/models/signup';
import { validateUserInfo } from 'src/app/shared/validates/user.info';
import { processFile } from './../../../shared/util/processFile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupInfo: SignUp;
  rePassword: string = '';
  profileImage!:FileUploadRequest;

  @ViewChild('files')
  files!:ElementRef;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toasts: ToastsService,
    private userService:UserService
  ) {
    this.signupInfo = new SignUp('', '', '');
  }

  ngOnInit(): void {}

  async onInputChange($event:any){
    const file = this.files.nativeElement.files[0];

    if(!file.name.includes('png') && !file.name.includes('jpg') && !file.name.includes('jpeg')){
      this.toasts.ErrorToastr('Insert Only Images', 'Error');
      this.files.nativeElement.value = "";
      return;
    }

    this.profileImage = await processFile(file) as FileUploadRequest;
  }

  submitSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if(!this.profileImage){
      this.catchError('Select a profile image');
      return
    }

    this.spinner.show();

    try {
      validateUserInfo.Email(this.signupInfo.email);
      validateUserInfo.Password(this.signupInfo.password);
      validateUserInfo.RepeatPassword(
        this.signupInfo.password,
        this.rePassword
      );

      //SAVE USER AND THEN SAVE PROFILE IMAGE
      this.authService.signUp(this.signupInfo).subscribe(
        (resp) => {

          //UPLOAD IMAGE
          this.userService.uploadUserImage(resp.id, this.profileImage).subscribe(resp => {
          this.spinner.hide();
          this.toasts.SuccessToastr('Account Created Succesfully', 'Success');
          this.router.navigateByUrl('/auth/home/login');
          }, (err => {
          this.catchError(err);
          }));

        },
        (err) => {
          this.catchError(err);
        }
      );
    } catch (e: any) {
      this.catchError(e.message);
    }
  }


  private catchError(message:string){
    this.spinner.hide();
      this.toasts.ErrorToastr(message, 'Error');
  }

}
