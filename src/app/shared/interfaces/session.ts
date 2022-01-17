export interface ResponseWithSession{
  value: {
    message: string,
    data: Session
  },
  statusCode: number;
  contentType?:string;
}

export interface Session{
  token:string;
  expiresIn:string;
}
