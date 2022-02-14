import React from 'react';

import { useCartData } from './useCart';

const Product = ({ product }) => {
    const { addItem, removeItem, cart } = useCartData();

    const selectedProduct = cart.find(
        productObj => productObj.sku === product.sku
    );

    return (
        <div className="product">
            <img src={product.image_url} alt={product.name} />

            <h3>{product.name}</h3>

            <div className="product-buttons">
                <button onClick={() => addItem(product.sku)} className="add">
                    Add to Cart
                    {selectedProduct && `(${selectedProduct.quantity})`}
                </button>
                {selectedProduct && (
                    <button
                        onClick={() => removeItem(product.sku)}
                        className="remove"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
