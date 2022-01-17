import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foldernameshortener'
})
export class FoldernameshortenerPipe implements PipeTransform {

  transform(folderName:string):string {
    return folderName.slice(0, 9);
  }

}
