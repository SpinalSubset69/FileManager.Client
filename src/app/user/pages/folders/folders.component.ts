import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Folder } from 'src/app/shared/interfaces/folder';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { processFile } from 'src/app/shared/util/processFile';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
})
export class FoldersComponent implements OnInit {
  folders: Folder[] = [];
  files: UserFile[] = [];
  folderId: number = 0;
  folderName: string = '';

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toasts: ToastsService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getFolders();
  }

  private getFolders() {
    this.userService.getUserFolders().subscribe((resp) => {
      this.folders = resp;
    });
    this.spinner.hide();
  }

  getFolderFiles(folderId: number, folderName: string = '') {
    this.spinner.show();
    this.folderName = `${folderName} content:`;
    this.folderId = folderId;
    this.userService.getFolderFiles(folderId).subscribe((resp) => {
      this.files = resp;
    });
    this.spinner.hide();
  }

  fileEvent($event: string) {
    this.spinner.show();

    if ($event === 'deleted') {
      this.toasts.SuccessToastr('File Deleted', 'Deleted');
    }

    if ($event === 'inserted') {
      this.toasts.SuccessToastr('File Inserted On Folder', 'Success');
    }

    if ($event === 'created') {
      this.toasts.SuccessToastr('Folder Created', 'Success');
      this.getFolders();
      return;
    }

    this.getFolderFiles(this.folderId);
  }

  onDragOver($event: any) {
    $event.preventDefault();
    const dragArea = document.querySelector('.drag-area');
    dragArea?.classList.add('active');
  }

  fileLeaved($event: any) {
    $event.preventDefault();
    const dragArea = document.querySelector('.drag-area');
    dragArea?.classList.remove('active');
  }

  async fileDropped($event: any) {
    $event.preventDefault();
    this.spinner.show();
    const dragArea = document.querySelector('.drag-area');
    dragArea?.classList.remove('active');
    this.spinner.show();

    //get File
    const file = $event.dataTransfer.files[0];

    if (!file) {
      this.spinner.hide();
      return;
    }

    const fileUploadRequest = await processFile(file);

    if (!fileUploadRequest) {
      this.toasts.ErrorToastr('Maximum File Size 30Mb', 'Error');
      return;
    }

    this.userService.uploadFile(fileUploadRequest).subscribe((resp) => {
      //Error from database
      if (typeof resp === 'string') {
        this.toasts.ErrorToastr(resp, 'Error');
        return;
      }

      //Insert file into the folder
      const file = resp as UserFile;
      this.userService
        .insertFileIntoFolder(file.id, this.folderId)
        .subscribe((resp) => {
          this.getFolderFiles(this.folderId);
        });
    });

    this.spinner.hide();
  }

  delete($event: any) {
    this.spinner.show();
    if ($event === 'delete') {
      this.spinner.show();
      this.userService.deleteFolder(this.folderId).subscribe((resp) => {
        this.spinner.hide();

        this.getFolders();
        this.toasts.SuccessToastr('Folder Deleted', 'Success');

        this.folderId = 0;
        this.files = [];
        this.folderName = '';
      });
    }

    this.spinner.hide();
  }
}
