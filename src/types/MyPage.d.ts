interface MyPage {
  data: {
    data: {
      item: {
        address?: string;
        bio?: string;
        name?: string;
        phone?: string;
        id: string;
        email: string;
        shop: Shop;
        type: 'employee' | 'employer';
      };
    };
  };
}
