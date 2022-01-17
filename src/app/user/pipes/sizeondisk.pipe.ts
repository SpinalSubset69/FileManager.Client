import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeondisk'
})
export class SizeondiskPipe implements PipeTransform {

  transform(size:number): string {
    const sizeondisk = (size / 1048576);
    return `${sizeondisk.toFixed(2)} mb`;
  }

}
