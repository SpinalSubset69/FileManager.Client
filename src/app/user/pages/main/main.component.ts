import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserFile } from 'src/app/shared/interfaces/userFile';
import { filterFiles } from 'src/app/shared/util/files.filter';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  files:UserFile[] = [];
  totalFolders:number = 0;
  dataToChart:any[] = [];
  user!:User;

  totalSize:string = '';
  totalFiles:number = 0;

  docs:UserFile[] = [];
  videos:UserFile[] = [];
  images:UserFile[] = [];
  executables:UserFile[] = [];
  constructor(private userService:UserService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.userService.getuser().subscribe(resp => {
      this.user = resp;
      this.calculateTotalSize();
    });

    this.userService.getAllUserFiles().subscribe(resp => {
      this.files = resp;
      this.totalFiles = this.files.length;
      this.delegateFiles();
    });

    this.userService.getUserFolders().subscribe(resp => {
      this.totalFolders = resp.length;
    })

    this.spinner.hide();
  }

  private delegateFiles(){
    var filesFiltered = filterFiles(this.files);
    this.images = filesFiltered.images;

    this.videos = filesFiltered.videos;

    this.docs = filesFiltered.docs;

    this.executables = filesFiltered.executables;

      this.dataToChart = [
        {
          name: 'Images',
          value: this.images.length
        },
        {
          name: 'Documents',
          value: this.docs.length
        },
        {
          name: 'Videos',
          value: this.videos.length
        },
        {
          name: 'Executables',
          value: this.executables.length
        }
      ]

  }

  private calculateTotalSize(){
    let size:number = 0;
    const sizeOnDisk = Number(this.user.spaceInUse) / 1048576;
    this.totalSize = `${sizeOnDisk.toFixed(2)} mb`;
    console.log(this.totalSize)
  }
}
