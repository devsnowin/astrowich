/**@jsxImportSource react */

import type { ShopItem } from '../types';
import { addItemToCart } from '../store/cart';

const AddToCart = ({ item }: { item: ShopItem }) => (
  <button
    onClick={() => {
      addItemToCart(item);
    }}
    className="bg-primary px-4 py-2 font-bold text-white rounded-md"
  >
    Add to cart
  </button>
);

export default AddToCart;
