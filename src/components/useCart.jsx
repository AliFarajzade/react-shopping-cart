import React, { useEffect, createContext, useReducer, useContext } from 'react';

import { reactLocalStorage } from 'reactjs-localstorage';

import {
    addItemHelper,
    removeItemHelper,
    decreaseItemHelper,
} from './useCartHelpers';

const CartContext = createContext(null);

export const useCartData = () => useContext(CartContext);

const INITIAL_STATE = {
    cart: [],
};

const reducer = (prevState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOCAL_STORAGE_CART':
            return {
                cart: action.payload,
            };

        case 'ADD_ITEM':
            return {
                ...prevState,
                cart: addItemHelper(prevState.cart, action.payload),
            };

        case 'REMOVE_ITEM':
            return {
                ...prevState,
                cart: removeItemHelper(prevState.cart, action.payload),
            };

        case 'DECREASE_ITEM':
            return {
                ...prevState,
                cart: decreaseItemHelper(prevState.cart, action.payload),
            };

        default:
            return prevState;
    }
};
const CartProvider = ({ children }) => {
    const [state, dispatchEvent] = useReducer(reducer, INITIAL_STATE);

    const addItem = sku => {
        dispatchEvent({ type: 'ADD_ITEM', payload: sku });
    };
    const removeItem = sku => {
        dispatchEvent({ type: 'REMOVE_ITEM', payload: sku });
    };
    const itemDecrement = sku => {
        dispatchEvent({ type: 'DECREASE_ITEM', payload: sku });
    };

    const setLocalStorageData = cart => {
        dispatchEvent({ type: 'LOCAL_STORAGE_CART', payload: cart });
    };

    const cartTotalQuantity = state.cart.reduce(
        (acc, productObj) => acc + productObj.quantity,
        0
    );

    const cartTotalPrice = state.cart.reduce(
        (acc, productObj) => acc + productObj.quantity * productObj.price,
        0
    );

    useEffect(() => {
        const localShoppingCart = reactLocalStorage.getObject('shoppingCart');
        setLocalStorageData(localShoppingCart);
    }, []);

    useEffect(() => {
        reactLocalStorage.setObject('shoppingCart', state.cart);
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                addItem,
                removeItem,
                itemDecrement,
                cartTotalQuantity,
                cartTotalPrice,
                cart: state.cart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
