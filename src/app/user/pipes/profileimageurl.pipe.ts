import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'profileimageurl'
})
export class ProfileimageurlPipe implements PipeTransform {

  transform(imageName:string): string {

    let baseUrl = '';
    if(environment.production){
      baseUrl = 'https://spinalfilemanager.azurewebsites.net/uploads/profileimages'
    }else{
      baseUrl='https://localhost:7006/uploads/profileimages'
    }


    return `${baseUrl}/${imageName}`;
  }

}
