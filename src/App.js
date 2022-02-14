import React from 'react';
import Header from './components/Header';
import products from './products';

import CartProvider from './components/useCart';

import Product from './components/products.component';

import './App.css';

export default function App() {
    return (
        <CartProvider>
            <div className="app">
                {/* header */}
                <Header />

                <main>
                    <div className="products-list">
                        {products.map((productObj, index) => (
                            <Product key={index} product={productObj} />
                        ))}
                    </div>
                </main>
            </div>
        </CartProvider>
    );
}
