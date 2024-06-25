export class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const ErrorMessages: { [key: string]: string } = {
  400: '잘못된 형식의 요청입니다.',
  401: '로그인이 필요합니다.',
  403: '토큰이 존재하지 않습니다.',
  404: '사용자가 존재하지 않습니다.',
  409: '이미 이메일이 존재합니다.',
  500: '서버에서 응답을 받아오지 못했습니다.',
  default: '예상치 못한 오류가 발생했습니다.',
};
