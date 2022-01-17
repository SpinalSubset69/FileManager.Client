import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(private toastr:ToastrService) { }

  public SuccessToastr(message:string, title:string){
    this.toastr.success(message, title, {
      positionClass:'toast-top-right'
    });
  }

  public ErrorToastr(message:string, title:string){
    this.toastr.error(message, title, {
      positionClass:'toast-top-right'
    });
  }
}
