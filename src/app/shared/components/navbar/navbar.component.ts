import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged$!:Observable<boolean>;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(!this.isLogged$){
      this.login();
    }
  }

  features(){
    this.switchNavbarActiveElement('features');
  }

  contact(){
    this.switchNavbarActiveElement('contact');
  }

  login(){
    this.switchNavbarActiveElement('login');
  }

  signup(){
    this.switchNavbarActiveElement('signup');
  }

  switchNavbarActiveElement(option:string){
    this.cleanActiveStatus();
    const link = document.getElementById(option);
    this.router.navigateByUrl(`/auth/home/${option}`);
    link?.classList.add('active');
  }

  cleanActiveStatus(){
    const features = document.getElementById('features');
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');
    const contact = document.getElementById('contact');

    features?.classList.remove('active');
    login?.classList.remove('active');
    signup?.classList.remove('active');
    contact?.classList.remove('active');
  }

  logout(){
    localStorage.clear();
    this.authService.validateSession();
    this.router.navigateByUrl("/login");
  }

}
