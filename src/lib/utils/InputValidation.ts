import {
  NOTICE_ERROR_MESSAGES,
  MYPAGE_ERROR_MESSAGES,
} from '@/constants/errorMessage';
import {
  AddNoticeFormData,
  AddNoticeFormErrors,
  MyPageFormData,
  MyPageFormErrors,
} from '@/types/FormData';

// AddNotice 유효성 검사 함수
export const validateAddNoticeForm = (
  data: AddNoticeFormData
): AddNoticeFormErrors => {
  const { hourlyPay, startsAt, workHour } = data;
  const errors: AddNoticeFormErrors = {
    hourlyPay: null,
    startsAt: null,
    workHour: null,
    description: null,
  };

  if (!hourlyPay || parseFloat(hourlyPay) === 0) {
    errors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_REQUIRED;
  }
  if (!startsAt) {
    errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_REQUIRED;
  } else {
    const startsAtDate = new Date(startsAt);
    if (startsAtDate < new Date()) {
      errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_PAST_DATE;
    }
  }
  if (!workHour || workHour === 0) {
    errors.workHour = NOTICE_ERROR_MESSAGES.WORK_HOUR_REQUIRED;
  } else if (workHour > 24) {
    errors.workHour = NOTICE_ERROR_MESSAGES.WORK_HOUR_EXCEEDS_LIMIT;
  }

  return errors;
};

// MyPage 유효성 검사 함수
export const validateMyPageForm = (data: MyPageFormData): MyPageFormErrors => {
  const { name, phone } = data;
  const errors: MyPageFormErrors = {
    name: null,
    phone: null,
    address: null,
    bio: null,
  };

  if (!name) {
    errors.name = MYPAGE_ERROR_MESSAGES.NAME_REQUIRED;
  }
  if (!phone) {
    errors.phone = MYPAGE_ERROR_MESSAGES.PHONE_REQUIRED;
  }

  return errors;
};
