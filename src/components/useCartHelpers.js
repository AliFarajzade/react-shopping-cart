import products from '../products';

export const addItemHelper = (prevCart, newItemToAddSku) => {
    const item = products.find(
        productObj => productObj.sku === newItemToAddSku
    );

    const existingItem = prevCart.find(
        productObj => productObj.sku === newItemToAddSku
    );

    if (existingItem)
        return prevCart.map(productObj =>
            productObj.sku === existingItem.sku
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : productObj
        );

    return [...prevCart, { ...item, quantity: 1 }];
};

export const removeItemHelper = (prevCart, itemToRemoveSku) => {
    return prevCart.filter(productObj => productObj.sku !== itemToRemoveSku);
};

export const decreaseItemHelper = (prevCart, itemToDecreaseSku) => {
    const item = prevCart.find(
        productObj => productObj.sku === itemToDecreaseSku
    );

    if (item.quantity === 1) return removeItemHelper(prevCart, item.sku);

    return prevCart.map(productObj =>
        productObj.sku === item.sku
            ? { ...item, quantity: item.quantity - 1 }
            : productObj
    );
};
