import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FileUploadRequest } from 'src/app/shared/models/fileUploadRequest';
import { processFile } from 'src/app/shared/util/processFile';

@Component({
  selector: 'app-uploadmodal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.css']
})
export class UploadmodalComponent implements OnInit {
  modalRef?: BsModalRef;
  @Output()file = new EventEmitter<FileUploadRequest | null>();
  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openInput(){
    const input = document.getElementById('file');;
    input?.click();
  }

  uploadFile(e:any){

    if(e.files[0] === undefined){
      return;
    }
    this.emitFile(e.files[0] as File);
  }


    //DRAG AND DROP AREA
    onDragOver($event: any) {
      $event.preventDefault();
      const dragArea = document.querySelector('.upload-area');
      dragArea?.classList.add('active');
    }

    fileLeaved($event: any) {
      $event.preventDefault();
      const dragArea = document.querySelector('.upload-area');
      dragArea?.classList.remove('active');
    }

    async fileDropped($event: any) {
      $event.preventDefault();
      const dragArea = document.querySelector('.upload-area');
      dragArea?.classList.remove('active');
      //get File
      const file = $event.dataTransfer.files[0];
      if (!file) {
        return;
      }

      this.emitFile(file);
    }

    //DRAG AND DROP AREA

    private async emitFile(file:File){
      const procesedFile = await processFile(file);

      if(!procesedFile){
        this.file.emit(null);
      }

      this.file.emit(procesedFile as FileUploadRequest);
      this.modalRef?.hide();
    }

}
