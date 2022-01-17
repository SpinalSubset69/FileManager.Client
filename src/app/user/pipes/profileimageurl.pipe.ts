import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileimageurl'
})
export class ProfileimageurlPipe implements PipeTransform {

  transform(imageName:string): string {
    return `https://localhost:7006/uploads/profileimages/${imageName}`;
  }

}
