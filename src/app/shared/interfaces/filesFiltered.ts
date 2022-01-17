import { UserFile } from "./userFile";

export interface FilesFiltered{
  docs:UserFile[],
  images:UserFile[],
  videos:UserFile[],
  executables:UserFile[],
}
