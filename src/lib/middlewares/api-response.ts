class ApiResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;

  constructor(data: any = null, message: string) {
    this.success = true;
    this.statusCode = 200;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
