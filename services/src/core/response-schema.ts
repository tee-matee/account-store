export interface IResponse {
  statusCode?: number;
  message?: string;
  data?: any;
}

export class ResponseSchema {
  constructor() {}
  public response(value: IResponse): IResponse {
    const { statusCode, message, data } = value;
    return {
      ...value,
      statusCode: statusCode || 200,
      message: message || '',
      data: data || {},
    };
  }
}
