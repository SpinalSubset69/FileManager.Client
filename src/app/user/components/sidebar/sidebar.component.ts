import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter<boolean>();
  @Input() user!:User;
  modalRef?: BsModalRef;

  constructor(private router:Router, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  navigate(target:string){
    this.router.navigateByUrl(`/user/home/${target}`);
  }

   opened: boolean = false;

  toggleSidebar() {
    this.opened = !this.opened;
  }

  logout(){
    this.modalRef?.hide();
    localStorage.clear();
    this.router.navigateByUrl("/auth");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
