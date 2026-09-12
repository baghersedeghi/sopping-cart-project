import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        return serializedCart ? JSON.parse(serializedCart) : null;
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return null;
    }
};
// const deleteCartFromLocalStorage = () => {
//     try {
//         localStorage.removeItem('cart');
//     } catch (error) {
//         console.error('Error deleting cart from localStorage:', error);
//     }
// };
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [...(loadCartFromLocalStorage()?.items || [])],
        // totalQuantity: [...(loadCartFromLocalStorage()?.items || [])].reduce((total, item) => total + item.quantity, 0),
        // totalProducts: 0
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    name: newItem.name,
                    image: newItem.image,
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
                state.totalQuantity++;
                saveCartToLocalStorage(state);
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
                saveCartToLocalStorage(state);      
            }
            toast.success(`${newItem.name} added to cart!`, {
                position: "top-center",
                autoClose: 2000,
            });
        },
        incrementItemQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
                saveCartToLocalStorage(state);
            }
        },
        decrementItemQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                saveCartToLocalStorage(state);
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
                saveCartToLocalStorage(state);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                saveCartToLocalStorage(state);
            }
            toast.error(`${existingItem.name} removed from cart!`, {
                position: "top-center",
                autoClose: 2000,
            });
            state.totalQuantity--;
        }
        ,
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            toast.info('Cart cleared!', {
                position: "top-center",
                autoClose: 2000,
            });
            saveCartToLocalStorage(state);
        }
    }
});

export const { addItem, removeItem, clearCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;