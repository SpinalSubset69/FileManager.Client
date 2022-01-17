import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extensionfile'
})
export class ExtensionfilePipe implements PipeTransform {

  transform(extension:string): string {
    let mimeType = '';

    if(extension.includes("rar") || extension.includes("zip")){
      mimeType = 'rar.png';
    }

    if(extension.includes("3gp") || extension.includes("mp4") || extension.includes("avi") || extension.includes("mkv")){
      mimeType = 'video.png';
    }

    if(extension.includes("docx")){
      mimeType = 'doc.png';
    }

    if(extension.includes("ppt")){
      mimeType = 'ppt.png';
    }

    if(extension.includes("pdf")){
      mimeType = 'pdf.png';
    }

    if(extension.includes('png') || extension.includes('jpg') || extension.includes('jpeg')){
      mimeType = 'image.png';
    }

    if(extension.includes('exe') || extension.includes('msi')){
      mimeType = 'program.png';
    }

    return `./../../../../assets/icons/${mimeType}`;
  }

}
