import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { FolderModel } from 'src/app/shared/models/folder';

@Component({
  selector: 'app-foldermodal',
  templateUrl: './foldermodal.component.html',
  styleUrls: ['./foldermodal.component.css'],
})
export class FoldermodalComponent implements OnInit {
  modalRef?: BsModalRef;
  folder: FolderModel;
  @Output() event = new EventEmitter<string>();

  constructor(
    private modalService: BsModalService,
    private userService: UserService
  ) {
    this.folder = new FolderModel('', '');
  }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addFolder(form: NgForm) {
    this.userService.createFodler(this.folder).subscribe((resp) => {
      this.modalRef?.hide();
      this.event.emit('created');
    });
  }
}
