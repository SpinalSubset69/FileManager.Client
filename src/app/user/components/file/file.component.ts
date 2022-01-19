import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Folder } from 'src/app/shared/interfaces/folder';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { getFileType } from 'src/app/shared/util/files.filter';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() file!:UserFile;
  @Output() event = new EventEmitter<string>();

  @ViewChild('download')
  download!:ElementRef;

  eventSubject:Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;
  folders: Folder[] = [];

  constructor(private userService:UserService, private modalService: BsModalService, private toasts:ToastsService) { }

  ngOnInit(): void {
  }

  openPreview(){
    const type = getFileType(this.file.fileExtension);

    if(type.includes('docs') || type.includes('executables')){
      this.download.nativeElement.click();
      return;
    }

    this.eventSubject.next();
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

  shareLink(){
    navigator.clipboard.writeText(this.download.nativeElement.getAttribute('href'));
    this.toasts.SuccessToastr('Download link copied to clipboard!', 'Share');
  }
}
