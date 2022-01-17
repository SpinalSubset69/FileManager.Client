import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Folder } from 'src/app/shared/interfaces/folder';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() file!:UserFile;
  @Output() event = new EventEmitter<string>();

  modalRef?: BsModalRef;
  folders: Folder[] = [];

  constructor(private userService:UserService, private modalService: BsModalService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  deleteFile(){
    this.userService.deleteFile(this.file.id).subscribe(resp => {
      this.event.emit('deleted');
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.userService.getUserFolders().subscribe(resp => {
      this.folders = resp;
    })
  }

  addFileToFolder(folderId:number){
    this.userService.insertFileIntoFolder(this.file.id, folderId).subscribe(resp => {
      this.modalRef?.hide();
      this.event.emit('inserted')
    });
  }
}
