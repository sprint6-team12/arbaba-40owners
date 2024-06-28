import {
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_MIN_LENGTH,
} from '@/constants/validation';

interface PasswordFormData {
  signUpEmail: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
}

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
        errorMessage = ERROR_MESSAGES.shopNameRequired;
      }
      break;
    case 'category':
      if (!value) {
        errorMessage = ERROR_MESSAGES.categoryRequired;
      }
      break;
    case 'address1':
      if (!value) {
        errorMessage = ERROR_MESSAGES.addressRequired;
      }
      break;
    case 'address2':
      if (!value) {
        errorMessage = ERROR_MESSAGES.addressDetailRequired;
      }
      break;
    case 'originalHourlyPay':
      if (!value) {
        errorMessage = ERROR_MESSAGES.hourlyPayRequired;
      }
      break;
    default:
      break;
  }
  return errorMessage;
};
