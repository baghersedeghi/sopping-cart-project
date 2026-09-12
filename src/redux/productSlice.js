import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items :[
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
                category: 'Electronics',
                rating: 4.5
            },
            {
                id: 2,
                name: 'Smart Watch',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
                category: 'Electronics',
                rating: 4.8
            },
            {
                id: 3,
                name: 'Running Shoes',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
                category: 'Fashion',
                rating: 4.3
            },
            {
                id: 4,
                name: 'Leather Backpack',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
                category: 'Fashion',
                rating: 4.6
            },
            {
                id: 5,
                name: 'Sunglasses',
                price: 59.99,
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
                category: 'Accessories',
                rating: 4.2
            },
            {
                id: 6,
                name: 'Coffee Maker',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
                category: 'Home',
                rating: 4.7
            },
            {
                id: 7,
                name: 'Desk Lamp',
                price: 45.99,
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
                category: 'Home',
                rating: 4.4
            },
            {
                id: 8,
                name: 'Yoga Mat',
                price: 29.99,
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
                category: 'Sports',
                rating: 4.5
            }
        ],
        loading: false,
        error: null,
    },
    reducers: {
        getProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        getProductsSuccess(state, action) {
            state.loading = false;
            state.items = action.payload;
        },
        getProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addToCart(state, action) {
            const product = state.items.find((p) => p.id === action.payload.id);
            if (product) {
                product.quantity += action.payload.quantity;
            }
        },
        removeFromCart(state, action) {
            const product = state.items.find((p) => p.id === action.payload);
            if (product) {
                product.quantity -= action.payload;
                if (product.quantity === 0) {
                    state.items = state.items.filter((p) => p.id !== product.id);
                }
            }
        },
    },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure, addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;