
import { toast } from 'react-toastify';
import { CartItem } from '../types';
import { getToken } from '../utils/dataUtils';
import fetchApi from '../utils/fetchUtil';

export const initialState = {
    items: [],
    totalPrice: 0,
    totalPages: 1,
    currentPage: 1,
};


export type ActionType =
    | { type: 'ADD'; items: CartItem[]; totalPrice: number }
    | { type: 'DECREASE'; items: CartItem[]; totalPrice: number }
    | { type: 'REMOVE'; items: CartItem[]; totalPrice: number; totalPages: number }
    | { type: 'SET_CART_ITEM'; items: CartItem[]; totalPrice: number; totalPages: number  }
    | { type: 'CLEAR_CART'; }
    | { type: 'SET_CURRENT_PAGE'; payload: number };


export const cartReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, items: action.items, totalPrice: action.totalPrice };
        case 'DECREASE':
            return { ...state, items: action.items, totalPrice: action.totalPrice };
        case 'REMOVE':
            return { ...state, items: action.items, totalPrice: action.totalPrice, totalPages: action.totalPages };
        case 'SET_CART_ITEM':
            return { ...state, items: action.items, totalPrice: action.totalPrice ,totalPages: action.totalPages };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'CLEAR_CART':
            return { ...state, items: [], totalPrice: 0, totalPages: 1, currentPage: 1 };
        default:
            return state;
    }
};


export const addToCart = async (productId: string, page: number, dispatch: React.Dispatch<ActionType>) => {
    const token = getToken();
    try {
        const response = await fetchApi(`/api/purchaseRoute/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: {
                productId,
                quantity: 1,
                notResort: true,
                page,
            },
        });
        if (response.ok) {
            toast.success(response.data.message);
            dispatch({ type: 'ADD', items: response.data.items, totalPrice: response.data.totalPrice });
        }
    } catch (error) {
        toast.error('Error adding to cart');
    }
};

export const decreaseFromCart = async (productId: string, page: number, dispatch: React.Dispatch<ActionType>) => {
    const token = getToken();
    try {
        const response = await fetchApi(`/api/purchaseRoute/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: {
                productId,
                quantity: -1,
                notResort: true,
                page,
            },
        });
        if (response.ok) {
            
            dispatch({ type: 'DECREASE', items: response.data.items, totalPrice: response.data.totalPrice });
        }
    } catch (error) {
        toast.error('Error decreasing quantity');
    }
};

export const removeFromCart = async (productId: string, quantity: number, page: number, dispatch: React.Dispatch<ActionType>) => {
    const token = getToken();
    try {
        const response = await fetchApi(`/api/purchaseRoute/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: {
                productId,
                quantity: -quantity,
                notResort: true,
                page,
            },
        });
        if (response.ok) {
            toast.success('Removed successfully');
            dispatch({ type: 'REMOVE', items: response.data.items, totalPrice: response.data.totalPrice, totalPages: response.data.totalPage });
        }
    } catch (error) {
        toast.error('Error removing from cart');
    }
};