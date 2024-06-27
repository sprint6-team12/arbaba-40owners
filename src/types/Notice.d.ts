interface NoticeResponse {
  data: Data;
}

interface Data {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword?: string;
  items: NoticeItem[];
}

interface NoticeItem {
  item: Notice;
  links: Link[];
}

interface Link {
  description: string;
  href: string;
  method: string;
  rel: string;
}

interface NoticeBase {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface Notice extends NoticeBase {
  shop: ShopData;
  currentUserApplication?: { item: currentUserApplication };
}

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
