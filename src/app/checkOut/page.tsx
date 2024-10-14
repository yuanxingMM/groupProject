'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CheckOutItem from '../component/checkOutItem/checkOutItem';
import { Button } from 'react-bootstrap';
import style from './checkoutStyle.module.scss';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import fetchApi from '../../utils/fetchUtil';
import LoadingComponent from '../component/shopping/LoadingComponent';
import PaginationComponent from '../component/PaginationComponent';
import { getToken } from '../../utils/dataUtils';
import { useCart } from '../../context/CartContext';

const CheckoutPage = () => {
    const { state, dispatch } = useCart();  
    const { totalPages, items, totalPrice, currentPage } = state;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const fetchProductsData = useCallback(async () => {
        try {
            const token = getToken();
            const data = await fetchApi(`/api/PurchaseRoute/getCartProducts/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (data.ok) {
                dispatch({
                    type: 'SET_CART_ITEM',
                    items: data.data.items,      
                    totalPrice: data.data.totalPrice, 
                    totalPages: data.data.totalPages,
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
            setIsLoading(false);
        }
    }, [currentPage, dispatch]);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const pay = async () => {
        const token = getToken();

        const data = await fetchApi("/api/purchaseRoute", {
            method: 'POST', headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (data.ok) {
            toast.success(data.data.message);
            router.push(`/myOrders`);
        } else {
            console.error('data.message error', data.data.message);
            toast.error('data.message error');
        }
    };

    const clearCart = async () => {
        const token = getToken();

        const data = await fetchApi("/api/purchaseRoute/clearCart", {
            method: 'POST', headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (data.ok) {
            toast.success(data.data.message);
            
            dispatch({ type: 'CLEAR_CART' });
        } else {
            console.error('data.message error', data.data.message);
            toast.error('data.message error');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
        }
    };

    if (isLoading || items === null) {
        return <LoadingComponent />;
    }

    return (
        <div className={style.wrapCon}>
            {!items || items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul style={{ margin: '0 auto', padding: '0' }}>
                        <div style={{ margin: '0 auto', display: 'block', height: '30px', minWidth: '300px', width: '80%', position: 'relative' }}>
                            <div style={{ margin: '0px auto', paddingBottom: '10px', position: 'absolute', left: '0px' }}>
                                <strong>Checkout</strong>
                            </div>
                        </div>
                        {items.map((item) => (
                            <li style={{ listStyle: 'none', margin: '0 auto', padding: '0' }} key={item.productId}>
                                <CheckOutItem {...item} />
                            </li>
                        ))}
                        <div style={{ margin: '0 auto', display: 'block', height: '150px', minWidth: '300px', width: '80%', position: 'relative' }}>
                            <div style={{ margin: '10px auto', position: 'absolute', right: '0px' }}>
                                <Button onClick={clearCart}>Clear</Button>
                            </div>
                            <div style={{ margin: '10px auto', position: 'absolute', top: '50px', right: '0px' }}>
                                <strong>Total Price: <span style={{ color: 'red' }}>¥{totalPrice.toFixed(2)}</span></strong>
                                <br />
                                <Button style={{ margin: '10px auto', position: 'absolute', right: '0px' }} onClick={pay}>Pay</Button>
                            </div>
                        </div>
                        <div style={{ margin: '0 auto', display: 'block', height: '70px', minWidth: '300px', width: '80%', position: 'relative' }}>
                            <div style={{ margin: '0 auto 20px auto' }}>
                                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;