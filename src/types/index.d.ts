export type NavItem = {
  name: string;
  to: string;
};

type CartItem = {
  quantity: number;
  item: ShopItem;
};

export type ShopItem = {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  price: number;
};

export type NewsLetterMsg = {
  name: string;
  email: string;
};
