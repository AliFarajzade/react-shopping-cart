import React from 'react';

import { useCartData } from './useCart';

export default function Cart() {
    const { cart, addItem, itemDecrement, cartTotalPrice } = useCartData();

    return (
        <div className="cart">
            {/* show cart items here */}

            {cart.map(productObj => (
                <div className="cart-item">
                    <img
                        src={productObj.image_url}
                        alt={productObj.name}
                        width="100"
                    />
                    <div className="content">
                        <h3>{productObj.name}</h3>

                        <div className="cart-buttons">
                            <button
                                onClick={() => itemDecrement(productObj.sku)}
                            >
                                -
                            </button>
                            <button>{productObj.quantity}</button>
                            <button onClick={() => addItem(productObj.sku)}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="total">${cartTotalPrice}</div>
        </div>
    );
}
