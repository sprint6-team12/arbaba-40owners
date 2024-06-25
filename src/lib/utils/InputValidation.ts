import { FormData, FormErrors } from '@/components/AddNotice/AddNoticeInput';
import { ERROR_MESSAGES } from '@/constants/errorMessage';

export const AddNoticeValidation = (data: FormData): FormErrors => {
  const noticeErrors: FormErrors = {
    hourlyPay: null,
    startsAt: null,
    workHour: null,
  };

  if (!data.hourlyPay || parseFloat(data.hourlyPay) === 0) {
    noticeErrors.hourlyPay = ERROR_MESSAGES.HOURLY_PAY_REQUIRED;
  }
  if (!data.startsAt) {
    noticeErrors.startsAt = ERROR_MESSAGES.STARTS_AT_REQUIRED;
  } else {
    const startsAtDate = new Date(data.startsAt);
    const currentDate = new Date();

    if (startsAtDate < currentDate) {
      noticeErrors.startsAt = ERROR_MESSAGES.STARTS_AT_PAST_DATE;
    }
  }
  if (!data.workHour || data.workHour === 0) {
    noticeErrors.workHour = ERROR_MESSAGES.WORK_HOUR_REQUIRED;
  } else if (data.workHour > 24) {
    noticeErrors.workHour = ERROR_MESSAGES.WORK_HOUR_EXCEEDS_LIMIT;
  }

  return noticeErrors;
};
