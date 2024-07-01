export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_MIN_LENGTH = 8;

export const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해주세요.',
  invalidEmail: '유효한 이메일 주소를 입력해주세요.',
  passwordRequired: '비밀번호를 입력해주세요.',
  passwordTooShort: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
};

export const NOTICE_ERROR_MESSAGES = {
  HOURLY_PAY_REQUIRED: '시급을 입력해주세요.',
  STARTS_AT_REQUIRED: '시작 일시를 입력해주세요.',
  WORK_HOUR_REQUIRED: '시간을 입력해주세요.',
  WORK_HOUR_EXCEEDS_LIMIT: '업무 시간은 24시간을 초과할 수 없습니다.',
  STARTS_AT_PAST_DATE: '지난 날짜는 선택할 수 없습니다.',
};
