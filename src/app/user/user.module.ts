import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileimageurlPipe } from './pipes/profileimageurl.pipe';
import { FilesComponent } from './components/files/files.component';
import { FileComponent } from './components/file/file.component';
import { FilenameshortenerPipe } from './pipes/filenameshortener.pipe';
import { SizeondiskPipe } from './pipes/sizeondisk.pipe';
import { ExtensionfilePipe } from './pipes/extensionfile.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FolderComponent } from './components/folder/folder.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { FoldermodalComponent } from './components/foldermodal/foldermodal.component';
import { FoldernameshortenerPipe } from './pipes/foldernameshortener.pipe';
import { DeletemodalComponent } from './components/deletemodal/deletemodal.component';
import { SidebarModule } from 'ng-sidebar';
import { UploadmodalComponent } from './components/uploadmodal/uploadmodal.component';
import { DownloadPipe } from './pipes/download.pipe';
import { UserComponent } from './pages/user/user.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    ProfileimageurlPipe,
    FilesComponent,
    FileComponent,
    FilenameshortenerPipe,
    SizeondiskPipe,
    ExtensionfilePipe,
    MainComponent,
    FolderComponent,
    FoldersComponent,
    FoldermodalComponent,
    FoldernameshortenerPipe,
    DeletemodalComponent,
    UploadmodalComponent,
    DownloadPipe,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BsDropdownModule,
    PaginationModule.forRoot(),
    SharedModule,
    ModalModule,
    NgxSpinnerModule,
    FormsModule,
    SidebarModule.forRoot()
  ],
  providers:[
    BsModalService
  ]
})
export class UserModule { }
