import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseErrorResponse, BaseResponse } from '../shared/interfaces/base-response';
import { Folder } from '../shared/interfaces/folder';
import { User } from '../shared/interfaces/user';
import { UserFile } from '../shared/interfaces/userFile';
import { FileUploadRequest } from '../shared/models/fileUploadRequest';
import { FolderModel } from '../shared/models/folder';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUri = '';

  public query:string = "";

  constructor(private http:HttpClient) {
    if(environment.production){
      this.baseApiUri =environment.prodApi;
    }else{
      this.baseApiUri = environment.devApi;
    }
  }

  getuser(): Observable<User>{
    return this.http.get<BaseResponse>(`${this.baseApiUri}/user`).pipe(
      map(resp => {
        const user:User = resp.value.data as User;
        console.log('Lo vas a lograr, seras un genial programador :33')
        if(user ===undefined){
          console.log('Lo vas a lograr, seras un genial programador :33')
        }
        return user
      })
    );
  }

  getUserFiles():Observable<UserFile[]>{
    return this.http.get<BaseResponse>(`${this.baseApiUri}/userfilesoutfolder`,{
    params: this.getParams()
    }).pipe(
      map(resp => {
        console.log(resp);
        return resp.value.data as UserFile[];
      })
    )
  }


  getAllUserFiles():Observable<UserFile[]>{
    return this.http.get<BaseResponse>(`${this.baseApiUri}/files`,{
    params: this.getParams()
    }).pipe(
      map(resp => {
        return resp.value.data as UserFile[];
      })
    )
  }


  uploadFile(file:FileUploadRequest):Observable<UserFile | string>{
    return this.http.post<BaseResponse | BaseErrorResponse>(`${this.baseApiUri}/uploadfile`, file).pipe(
      map(resp => {
        const respoWithoutError = resp as BaseResponse;
        const file =  respoWithoutError.value.data as UserFile;
        if(file){
        return file;
        }

        const responseWithError = resp as BaseErrorResponse;
        const detail = responseWithError.value.detail;

        return detail as string;
      })
    );
  }

  deleteFile(id:number){
    return this.http.delete(`${this.baseApiUri}/file/${id}`);
  }

  queryOnFiles(query:string):Observable<UserFile[]>{
    this.query = query;
    return this.http.get<BaseResponse>(`${this.baseApiUri}/queryonfiles`,{
      params: this.getParams()
    }).pipe(
      map(resp => {
        return resp.value.data as UserFile[]
      })
    )
  }

  getUserFolders():Observable<Folder[]>{
    return this.http.get<BaseResponse>(`${this.baseApiUri}/folders`).pipe(
      map(resp => {
        return resp.value.data as Folder[];
      })
    )
  }

  insertFileIntoFolder(fileId:number, folderId:number){
    const data = {
      fileId,
      folderId
    }

    return this.http.put(`${this.baseApiUri}/insertfileintofolder`, data);
  }

  getFolderFiles(folderId:number):Observable<UserFile[]>{
    return this.http.get<BaseResponse>(`${this.baseApiUri}/files/${folderId}`).pipe(
      map(resp => {
        return resp.value.data as UserFile[]
      })
    )
  }

  createFodler(folder:FolderModel){
    return this.http.post(`${this.baseApiUri}/folder`, folder);
  }

  deleteFolder(folderId:number){
    return this.http.delete(`${this.baseApiUri}/folder/${folderId}`);
  }

  uploadUserImage(id:number, file:FileUploadRequest){
    return this.http.post(`${this.baseApiUri}/userimage/${id}`, file);
  }

  getParams():HttpParams{
    const paramsForRequest = {
      query: this.query
    }
    const params:HttpParamsOptions = {};
    params.fromObject = paramsForRequest;

    return new HttpParams(params);
  }
}
