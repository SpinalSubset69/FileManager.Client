import { FilesFiltered } from "../interfaces/filesFiltered";
import { UserFile } from "../interfaces/userFile";

export const filterFiles = (userFiles:UserFile[]):FilesFiltered => {
  return {
    docs: userFiles.filter(
      (x) =>
        x.fileExtension.includes('pdf') ||
        x.fileExtension.includes('docx') ||
        x.fileExtension.includes('ppt') ||
        x.fileExtension.includes('rar') ||
        x.fileExtension.includes('zip')
    ),
    executables: userFiles.filter(
      (x) =>
        x.fileExtension.includes('exe') ||
        x.fileExtension.includes('msi')
    ),
    videos: userFiles.filter(
      (x) =>
        x.fileExtension.includes('mp4') ||
        x.fileExtension.includes('3gp') ||
        x.fileExtension.includes('avi')
    ),
    images: userFiles.filter(
      (x) =>
        x.fileExtension.includes('png') ||
        x.fileExtension.includes('jpg') ||
        x.fileExtension.includes('jpeg')
    )
  } as FilesFiltered;
}
