import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filenameshortener'
})
export class FilenameshortenerPipe implements PipeTransform {

  transform(fileName: string, fileExtension:string): string {
    let name = fileName;
    const extension = fileExtension;

    if(name.length >= 11){
      name = name.slice(0, 9);
    }

    return name +"."+extension;
  }

}
