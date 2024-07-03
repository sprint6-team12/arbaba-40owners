import { ShopNoticeFormErrors } from '@/components/pageComponents/AddNotice/AddNoticeInput';
import { UserInfoFormErrors } from '@/components/pageComponents/MyPage/MyPageInput';
import {
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_MIN_LENGTH,
  NOTICE_ERROR_MESSAGES,
  MYPAGE_ERROR_MESSAGES,
  ERROR_MESSAGES_SHOP,
} from '@/constants/errorMessage';
import { ShopNoticeData } from '@/lib/api/noticeAPI';
import { UserInfo } from '@/lib/api/userAPI';

interface PasswordFormData {
  signUpEmail: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
}

//로그인 유효성 검사
export const SignInValidate = (name: string, value: string) => {
  let errorMessage = '';
  if (name === 'loginEmail') {
    if (!value) {
      errorMessage = ERROR_MESSAGES.emailRequired;
    } else if (!EMAIL_REGEX.test(value)) {
      errorMessage = ERROR_MESSAGES.invalidEmail;
    }
  }
  if (name === 'loginPassWord') {
    if (!value) {
      errorMessage = ERROR_MESSAGES.passwordRequired;
    } else if (value.length < PASSWORD_MIN_LENGTH) {
      errorMessage = ERROR_MESSAGES.passwordTooShort;
    }
  }
  return errorMessage;
};

//회원가입 유효성 검사
export const SignUpValidate = (
  name: string,
  value: string,
  formData: PasswordFormData
) => {
  let errorMessage = '';
  if (name === 'signUpEmail') {
    if (!value) {
      errorMessage = ERROR_MESSAGES.emailRequired;
    } else if (!EMAIL_REGEX.test(value)) {
      errorMessage = ERROR_MESSAGES.invalidEmail;
    }
  }
  if (name === 'signUpPassword') {
    if (!value) {
      errorMessage = ERROR_MESSAGES.passwordRequired;
    } else if (value.length < PASSWORD_MIN_LENGTH) {
      errorMessage = ERROR_MESSAGES.passwordTooShort;
    }
  }
  if (name === 'signUpPasswordConfirm') {
    if (formData.signUpPassword !== value) {
      errorMessage = ERROR_MESSAGES.passwordMismatch;
    }
  }
  return errorMessage;
};

export const validateShopInfo = (id: string, value: string) => {
  let errorMessage = '';

  switch (id) {
    case 'name':
      if (!value) {
        errorMessage = ERROR_MESSAGES_SHOP.shopNameRequired;
      }
      break;
    case 'category':
      if (!value) {
        errorMessage = ERROR_MESSAGES_SHOP.categoryRequired;
      }
      break;
    case 'address1':
      if (!value) {
        errorMessage = ERROR_MESSAGES_SHOP.addressRequired;
      }
      break;
    case 'address2':
      if (!value) {
        errorMessage = ERROR_MESSAGES_SHOP.addressDetailRequired;
      }
      break;
    case 'originalHourlyPay':
      if (!value) {
        errorMessage = ERROR_MESSAGES_SHOP.hourlyPayRequired;
      }
      break;
    default:
      break;
  }
  return errorMessage;
};
//공고등록(AddNotice) 유효성 검사
export const validateAddNoticeForm = (
  data: ShopNoticeData
): ShopNoticeFormErrors => {
  const { hourlyPay, startsAt, workhour } = data;
  const errors: ShopNoticeFormErrors = {
    hourlyPay: null,
    startsAt: null,
    workhour: null,
    description: null,
  };

  if (!hourlyPay || hourlyPay === 0) {
    errors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_REQUIRED;
  } else if (hourlyPay <= 1000) {
    errors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_TOO_LOW;
  }
  if (!startsAt) {
    errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_REQUIRED;
  } else {
    const startsAtDate = new Date(startsAt);
    if (startsAtDate < new Date()) {
      errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_PAST_DATE;
    }
  }
  if (!workhour || workhour === 0) {
    errors.workhour = NOTICE_ERROR_MESSAGES.WORK_HOUR_REQUIRED;
  } else if (workhour > 24) {
    errors.workhour = NOTICE_ERROR_MESSAGES.WORK_HOUR_EXCEEDS_LIMIT;
  }

  return errors;
};

//내프로필수정(MyPage) 유효성 검사
export const validateMyPageForm = (data: UserInfo): UserInfoFormErrors => {
  const { name, phone } = data;
  const errors: UserInfoFormErrors = {
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
