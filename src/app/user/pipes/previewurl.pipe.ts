import { Pipe, PipeTransform } from '@angular/core';
import { getFileType } from 'src/app/shared/util/files.filter';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'previewurl'
})
export class PreviewurlPipe implements PipeTransform {

  transform(fileName: string): string {
    const fileExtension = fileName.split('.')[fileName.split('.').length -1];
    const fileType = getFileType(fileExtension);

    let baseUrl = '';
    if(environment.production){
      baseUrl = 'https://spinalfilemanager.azurewebsites.net/uploads'
    }else{
      baseUrl='https://localhost:7006/uploads'
    }

    return `${baseUrl}/${fileType}/${fileName}`;

  }

}
