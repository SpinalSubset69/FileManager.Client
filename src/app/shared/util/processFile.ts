import { FileUploadRequest } from "../models/fileUploadRequest";
import { toBase64Async } from "./base64";

export const processFile = async (file:File):Promise<FileUploadRequest | null> => {
  const content = await toBase64Async(file);

  if(content.length >= 30000000){
    return null;
  }

  return new FileUploadRequest(file.name, content);

}
