export interface BaseResponse{
  value: {
    message: string,
    data: any
  },
  statusCode: number;
  contentType?:string;
}

export interface BaseErrorResponse{
  value: {
    message: string,
    detail: string
  },
  statusCode: number;
  contentType?:string;
}
