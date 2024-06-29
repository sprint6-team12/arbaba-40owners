export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface Notice {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

export interface Application {
  id: string;
  status: string;
}

export interface AlertItemProps {
  id: string;
  createdAt: string;
  result: string;
  read: boolean;
  application: {
    item: Application;
    href: string;
  };
  shop: {
    item: Shop;
    href: string;
  };
  notice: {
    item: Notice;
    href: string;
  };
  links: {
    rel: string;
    description: string;
    method: string;
    href: string;
  }[];
}

export interface NotificationProps {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: {
    item: AlertItemProps;
  }[];
  links: {
    rel: string;
    description: string;
    method: string;
    href: string;
  }[];
}

export interface NotificationModalProps {
  data: NotificationProps | null;
  onClose: () => void;
}
