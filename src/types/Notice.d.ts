interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: ShopData;
  currentUserApplication?: { item: currentUserApplication };
}

interface currentUserApplication {
  id: string; // application.id,
  status: UserApplicationStatus; // application.status
  createdAt: string; // application.createdAt
}
