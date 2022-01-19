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

export const queryOnFiles = ( userFiles:UserFile[] ,query:string):FilesFiltered => {
  return {
    docs: userFiles.filter(
      (x) =>
        x.fileExtension.includes('pdf') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('docx') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('ppt') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('rar') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('zip') && x.fileName.toLowerCase().includes(query.toLowerCase())
    ),
    executables: userFiles.filter(
      (x) =>
        x.fileExtension.includes('exe') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('msi') && x.fileName.toLowerCase().includes(query.toLowerCase())
    ),
    videos: userFiles.filter(
      (x) =>
        x.fileExtension.includes('mp4') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('3gp') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('avi') && x.fileName.toLowerCase().includes(query.toLowerCase())
    ),
    images: userFiles.filter(
      (x) =>
        x.fileExtension.includes('png') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('jpg') && x.fileName.toLowerCase().includes(query.toLowerCase()) ||
        x.fileExtension.includes('jpeg') && x.fileName.toLowerCase().includes(query.toLowerCase())
    )
  } as FilesFiltered;
}
