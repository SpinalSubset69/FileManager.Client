import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { getFileType } from 'src/app/shared/util/files.filter';

@Component({
  selector: 'app-filepreviewmodal',
  templateUrl: './filepreviewmodal.component.html',
  styleUrls: ['./filepreviewmodal.component.css']
})
export class FilepreviewmodalComponent implements OnInit {
  @Input() file!:UserFile;
  private eventSubscription!: Subscription;
  @Input() event!: Observable<void>;
  modalRef?: BsModalRef;
  fileName!:string;
  fileType!:string;

  @ViewChild('template')
  template!:TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(() => {
      this.fileName = `${this.file.fileName}.${this.file.fileExtension}`;
      this.fileType = getFileType(this.file.fileExtension);

      if(this.fileType == 'docs'){
        return;
      }

      this.modalRef = this.modalService.show(this.template);
    });
  }


}
