/** @jsxImportSource solid-js */

import { Show, createSignal, Component, createEffect } from 'solid-js';
import { useStore } from '@nanostores/solid';
import type { CartItem } from '../types';
import { $cart as cart, removeItemFromCart, subtotal } from '../store/cart';
import { formatCurrency } from '../utils/formatCurrency';

const EmptyState = () => {
  return (
    <div class="max-w-xs space-y-2 pt-4">
      <span role="img" aria-label="cake" class="text-2xl">
        🌭
      </span>
      <p>
        Your cart is empty! Add a sandwich kit or two and give flavor a chance.
      </p>
    </div>
  );
};

const CheckoutNotice = () => <p>Checkout is not implemented yet.</p>;

const CartButton = ({ handleOpen }: { handleOpen: () => void }) => {
  const $cart = useStore(cart);

  return (
    <button
      id="btnCart"
      class="bg-primary py-2 px-4 text-white font-bold rounded-md relative"
      onClick={handleOpen}
    >
      Cart{' '}
      <span class="inline-block whitespace-nowrap rounded-full bg-red-400 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-100 absolute -right-2 -top-2">
        {Object.values($cart()).length}
      </span>
    </button>
  );
};

const Cart: Component = () => {
  const [showNotice, setShowNotice] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);
  const $subtotal = useStore(subtotal);
  const $cart = useStore(cart);

  createEffect(() => console.log(Object.values($cart()).length > 0));

  function handleOpen() {
    setIsOpen(!isOpen());
  }

  return (
    <section class="">
      <CartButton handleOpen={handleOpen} />
      <Show when={isOpen()}>
        <aside class=" absolute max-w-fit h-fit min-h-[20rem] px-6 py-4 right-0 top-14 text-center bg-white shadow-md rounded-md grid grid-rows-[auto_1fr_auto] gap-2 divide-y-2 divide-slate-800">
          <h2 class="font-bold text-2xl">Your cart</h2>
          <Show
            when={Object.values($cart()).length > 0}
            fallback={<EmptyState />}
          >
            <ul class="pt-4 flex flex-col items-start gap-2 text-left">
              {Object.values($cart()).map((entry: CartItem) => (
                <li class="flex items-center gap-6">
                  <div class="flex items-center gap-2 ">
                    <span>{entry.quantity}</span>
                    <p class="w-48">{entry.item.title}</p>
                    <button
                      onClick={() => removeItemFromCart(entry.item.id)}
                      class="text-4xl "
                    >
                      &times;
                    </button>
                  </div>
                  <span>{entry.item.price}</span>
                </li>
              ))}
            </ul>
            <div class="pt-4 flex flex-col items-center gap-2">
              <p class="w-full flex items-center justify-between">
                <span>Subtotal:</span>
                {formatCurrency($subtotal())}
              </p>
              <p class="w-full flex items-center justify-between">
                <span>Shipping:</span>
                <span class="space-x-2">
                  <del>$10.00</del>
                  <ins>FREE</ins>
                </span>
              </p>
              <p class="w-full flex items-center justify-between">
                <span>Total:</span>
                {formatCurrency($subtotal())}
              </p>
              <p class="w-full flex items-center justify-between">
                <button
                  onClick={() => setShowNotice(true)}
                  class="bg-primary py-2 px-4 text-white font-bold rounded-md"
                >
                  Checkout
                </button>
              </p>
              <Show when={showNotice()}>
                <CheckoutNotice />
              </Show>
            </div>
          </Show>
        </aside>
      </Show>
    </section>
  );

  // return (
  //   <>
  //     {isOpen() ? (
  //       <aside class="bg-red-500">
  //         <h2>Your cart</h2>
  //         <Show
  //           when={Object.values($cart).length > 0}
  //           fallback={<EmptyState />}
  //         >
  //           <ul>
  //             {Object.values($cart).map((entry: CartItem) => (
  //               <li>
  //                 <span>{entry.quantity}</span>
  //                 <span>{entry.quantity}</span>
  //                 <button onDblClick={() => removeAddFromCart(entry.item.id)}>
  //                   &times;
  //                 </button>
  //                 <span>{entry.item.price}</span>
  //               </li>
  //             ))}
  //           </ul>
  //           <div>
  //             <p>
  //               <span>Subtotal:</span>
  //               {formatCurrency($subtotal())}
  //             </p>
  //             <p>
  //               <span>Shipping:</span>
  //               <del>$10.00</del>
  //               <ins>FREE</ins>
  //             </p>
  //             <p>
  //               <span>Total:</span>
  //               {formatCurrency($subtotal())}
  //             </p>
  //             <p>
  //               <button onClick={() => setShowNotice(true)}>Checkout</button>
  //             </p>
  //             <Show when={showNotice()}>
  //               <CheckoutNotice />
  //             </Show>
  //           </div>
  //         </Show>
  //       </aside>
  //     ) : (
  //       <button
  //         id="btnCart"
  //         class="bg-primary p-2 font-bold rounded-md"
  //         onClick={() => setIsOpen((prev) => !prev)}
  //       >
  //         <CartIcon />
  //       </button>
  //     )}
  //   </>
  // );
};

export default Cart;
