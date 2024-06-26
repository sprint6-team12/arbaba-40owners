interface NoticeBase {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface Notice extends NoticeBase {}

interface currentUserApplication {
  id: string; // application.id
  status: UserApplicationStatus; // application.status
  createdAt: string; // application.createdAt
}

interface NoticeEmployee extends NoticeBase {
  shop: ShopData;
  currentUserApplication?: { item: currentUserApplication };
}

interface NoticeEmployer extends NoticeBase {}
