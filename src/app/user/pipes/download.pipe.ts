import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'download'
})
export class DownloadPipe implements PipeTransform {

  transform(id: number): string{
    let baseUrl = '';
    if(environment.production){
      baseUrl = 'https://spinalfilemanager.azurewebsites.net/download/file'
    }else{
      baseUrl='https://localhost:7006/download/file'
    }

    return `${baseUrl}/${id}`;
  }

}
