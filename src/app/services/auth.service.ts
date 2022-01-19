import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseErrorResponse, BaseResponse } from '../shared/interfaces/base-response';
import { Session } from '../shared/interfaces/session';
import { User } from '../shared/interfaces/user';
import { Login } from '../shared/models/login';
import { SignUp } from '../shared/models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSource = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.loginSource.asObservable();

  baseApiUri = '';

  constructor(private http:HttpClient) {
    if(environment.production){
      this.baseApiUri =environment.prodApi;
    }else{
      this.baseApiUri = environment.devApi;
    }
   }

  login(info:Login): Observable<Session | string>{
    return this.http.post<BaseResponse | BaseErrorResponse>(`${this.baseApiUri}/login`, info).pipe(
      map(resp => {

        const respoWithoutError = resp as BaseResponse;
        const session =  respoWithoutError.value.data as Session;
        if(session){
        this.SaveTokenAndExpirationTime(session.token, session.expiresIn);
        return session;
        }

        const responseWithError = resp as BaseErrorResponse;
        const detail = responseWithError.value.detail;

        return detail as string;

      })
    );
  }

  signUp(info:SignUp):Observable<User>{
    return this.http.post<BaseResponse>(`${this.baseApiUri}/signup`, info).pipe(
      map(resp => {
        return resp.value.data as User;
      })
    );
  }


  validateSession():boolean{
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if(!token || !expiresIn){
      this.loginSource.next(false);
      return false;
    }

    const dateToExpire = new Date();
    dateToExpire.setTime(Number(expiresIn));

    this.loginSource.next(dateToExpire > new Date());

    return dateToExpire > new Date();
  }

  private SaveTokenAndExpirationTime(token:string, expiresIn:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
  }
}
