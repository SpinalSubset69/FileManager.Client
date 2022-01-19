import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter<boolean>();
  @Input() user!: User;
  modalRef?: BsModalRef;

  @ViewChild('bar1')
  bar1!: ElementRef;

  @ViewChild('bar2')
  bar2!: ElementRef;

  @ViewChild('bar3')
  bar3!: ElementRef;

  constructor(private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {}

  navigate(target: string) {
    this.router.navigateByUrl(`/user/home/${target}`);
  }

  opened: boolean = false;

  toggleSidebar() {
    this.barsExit();

    setTimeout(() => {
      this.opened = !this.opened;
    }, 500);

  }

  logout() {
    this.modalRef?.hide();
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  barsEntrance(){
    this.bar1.nativeElement.classList.remove('bar1Out');
    this.bar2.nativeElement.classList.remove('bar2Out');
    this.bar3.nativeElement.classList.remove('bar3Out');

    this.bar1.nativeElement.classList.add('bar1');
    this.bar2.nativeElement.classList.add('bar2');
    this.bar3.nativeElement.classList.add('bar3');
  }

  barsExit() {
    this.bar1.nativeElement.classList.remove('bar1');
    this.bar2.nativeElement.classList.remove('bar2');
    this.bar3.nativeElement.classList.remove('bar3');

    this.bar1.nativeElement.classList.add('bar1Out');
    this.bar2.nativeElement.classList.add('bar2Out');
    this.bar3.nativeElement.classList.add('bar3Out');
  }
}
