import React, { useRef, useState } from 'react';
import CartIcon from '../supermarket.svg';

import Cart from './Cart';

import { useCartData } from './useCart';

import useOnClickOutside from 'use-onclickoutside';

export default function Header() {
    const { cartTotalQuantity } = useCartData();

    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useOnClickOutside(modalRef, () => isOpen && setIsOpen(false));

    return (
        <header ref={modalRef}>
            <div className="container">
                <div className="cart-button">
                    <button onClick={() => setIsOpen(prevState => !prevState)}>
                        <img alt="cart icon" src={CartIcon} width="30" />
                        {cartTotalQuantity}
                    </button>
                </div>

                {isOpen && (
                    <div className="cart-modal">
                        <Cart />
                    </div>
                )}
            </div>
        </header>
    );
}
