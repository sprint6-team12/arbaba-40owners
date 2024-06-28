export interface AddNoticeFormData {
  hourlyPay: string;
  startsAt: string;
  workHour: number;
  description: string;
}

export interface AddNoticeFormErrors {
  hourlyPay: string | null;
  startsAt: string | null;
  workHour: string | null;
  description: null;
}

export interface MyPageFormData {
  name: string;
  phone: string;
  address?: string;
  bio?: string;
}

export interface MyPageFormErrors {
  name: string | null;
  phone: string | null;
  address?: string | null;
  bio?: string | null;
}
