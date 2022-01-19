import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsService } from 'src/app/services/toasts.service';
import { UserService } from 'src/app/services/user.service';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { FileUploadRequest } from 'src/app/shared/models/fileUploadRequest';
import { filterFiles, queryOnFiles } from 'src/app/shared/util/files.filter';
import { processFile } from 'src/app/shared/util/processFile';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  files: UserFile[] = [];
  totalItems!: number;
  pageSize!: number;
  dragAndDropText = 'Drag And Drop Your Files Here';

  images: UserFile[] = [];
  videos: UserFile[] = [];
  docs: UserFile[] = [];
  executables: UserFile[] = [];

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toasts: ToastsService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getFiles();
  }

  //DRAG AND DROP AREA
  onDragOver($event: any) {
    $event.preventDefault();
    const dragArea = document.querySelector('.files');
    dragArea?.classList.add('active');
    this.dragAndDropText = 'Drop Your file Here';
  }

  fileLeaved($event: any) {
    $event.preventDefault();
    const dragArea = document.querySelector('.files');
    dragArea?.classList.remove('active');
    this.dragAndDropText =
      'Drag And Drop Your Files To Upload Them Into The Server';
  }

  async fileDropped($event: any) {
    $event.preventDefault();
    const dragArea = document.querySelector('.files');
    dragArea?.classList.remove('active');

    this.spinner.show();

    //get File
    const file = $event.dataTransfer.files[0];
    if (!file) {
      this.spinner.hide();
      return;
    }

    const fileUploadRequest = await processFile(file);

    this.uploadFile(fileUploadRequest);
  }

  //DRAG AND DROP AREA

  fileEvent($event: string) {
    if ($event === 'deleted') {
      this.toasts.SuccessToastr('File Deleted', 'Deleted');
    }

    if ($event === 'inserted') {
      this.toasts.SuccessToastr('File Inserted on Folder', 'Success');
    }

    this.getFiles();
  }

  queryOnFiles(q: string) {
    this.spinner.show();
    this.delegateQueyOnFiles(q);
    this.spinner.hide();
  }

  uploadFile(file:FileUploadRequest | null){
    if (!file) {
      this.toasts.ErrorToastr('Maximum File Size 30Mb', 'Error');
      this.spinner.hide();
      return;
    }

    this.userService.uploadFile(file).subscribe((resp) => {

      if (typeof resp === 'string') {
        this.toasts.ErrorToastr(resp, 'Error');
        this.spinner.hide();
        return;
      }


      this.getFiles();
      this.toasts.SuccessToastr('File saved on DB', ' Saved');
    });
  }

  private getFiles() {
    this.userService.getUserFiles().subscribe((resp) => {
      this.files = resp;
      this.delegateFiles();
    });
    this.spinner.hide();
  }

  private delegateFiles() {
    const filesFiltered = filterFiles(this.files);
    this.docs = filesFiltered.docs;
    this.images = filesFiltered.images;
    this.videos = filesFiltered.videos;
    this.executables = filesFiltered.executables;
  }

  private delegateQueyOnFiles(query:string){
    const filesFiltered = queryOnFiles(this.files, query);
    this.docs = filesFiltered.docs;
    this.images = filesFiltered.images;
    this.videos = filesFiltered.videos;
    this.executables = filesFiltered.executables;
  }
}
