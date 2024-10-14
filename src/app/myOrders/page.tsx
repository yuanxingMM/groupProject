"use client";
import React, { useCallback, useEffect, useState } from 'react';
import style from './myOrderStyle.module.scss';
import LoadingComponent from '../component/shopping/LoadingComponent';
import { toast } from 'react-toastify';
import MyOrdersItem from '../component/myOrders/myOrdersItem';
import PaginationComponent from '../component/PaginationComponent';
import fetchApi from '../../utils/fetchUtil';
import { getToken } from '../../utils/dataUtils';
const MyOrdersPage = () => {
    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [totalPrice, setTotalPrice] = useState(0);
    const fetchProductsData = useCallback(async () => {
        try {
            const token = getToken();
            const data = await fetchApi(`/api/purchaseRoute/purchaseHistory?page=${currentPage}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
                .then((data) => {
                    setItems(data.data.pageData);
                    setTotalPages(data.data.totalPages);
                    setTotalPrice(data.data.totalPrice);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    toast.error('Error fetching data');
                    setIsLoading(false);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
            setIsLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    if (isLoading || items === null) {
        return <LoadingComponent />;
    }

    
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={style.wrapCon}>
            {items.length === 0 ? (
                <p>Your purchase history is empty.</p>
            ) : (
                <div>
                    <ul style={{ margin: '0 auto', padding: '0' }}>
                        <div style={{ margin: '0 auto', display: 'block', height: '30px', minWidth: '300px', width: '80%', position: 'relative' }}>
                            <div style={{ margin: '0px auto', paddingBottom: '10px', position: 'absolute', left: '0px' }}>
                                <strong>Purchase History</strong>
                            </div>
                        </div>
                        {items.map((item) => (
                            <li style={{ listStyle: 'none', margin: '0 auto', padding: '0' }} key={item.productId}>

                                <MyOrdersItem {...item}

                                />

                            </li>
                        ))}
                        <div style={{ margin: '0 auto', display: 'block', height: '50px', minWidth: '300px', width: '80%', position: 'relative' }}>

                            <div style={{ margin: '10px auto', position: 'absolute', top: '0px', right: '0px' }}>
                                <strong>Total Consumption: <span style={{ color: 'red' }}>¥{totalPrice.toFixed(2)}</span></strong>
                                <br></br>

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

export default MyOrdersPage;